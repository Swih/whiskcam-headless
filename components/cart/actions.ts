"use server";

import { TAGS } from "lib/constants";
import { baseUrl } from "lib/utils";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  syncHalloweenDiscount,
} from "lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    if (!(await cookies()).get("cartId")) await createCartAndSetCookie();
    const updated = await addToCart([
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    if (
      !updated.id ||
      !updated.lines.some((line) => line.merchandise.id === selectedVariantId)
    ) {
      return "Error adding item to cart";
    }
    // A temporary promotion error must never discard an otherwise valid cart.
    try {
      await syncHalloweenDiscount(updated);
    } catch {
      console.warn("Could not synchronise the seasonal cart discount.");
    }
    revalidateTag(TAGS.cart, "seconds");
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: unknown, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart, "seconds");
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart, "seconds");
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function prepareCheckout() {
  let cart = await getCart();
  if (cart) {
    try {
      cart = await syncHalloweenDiscount(cart);
    } catch {
      console.warn("Could not synchronise the seasonal checkout discount.");
    }
  }
  if (cart?.checkoutUrl) {
    // Shopify builds the checkout URL on its own primary domain. Send the buyer
    // straight there — with one exception: if it comes back on the storefront
    // host, that host is served by Vercel and would 404, so it has to be swapped
    // for a host Shopify actually answers on.
    //
    // The previous test was `!url.includes(".myshopify.com")`, which turns into a
    // trap the moment checkout moves to a branded subdomain: a URL on
    // checkout.whiskcam.com would be rewritten straight back to *.myshopify.com,
    // silently undoing the move. Comparing against the storefront host instead is
    // correct whether checkout lives on myshopify.com or on our own subdomain.
    const checkoutHost =
      process.env.SHOPIFY_CHECKOUT_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
    let url = cart.checkoutUrl;
    if (checkoutHost && new URL(url).hostname === new URL(baseUrl).hostname) {
      url = url.replace(/https?:\/\/[^/]+/, `https://${checkoutHost}`);
    }
    return {
      url,
      value: cart.cost.totalAmount.amount,
      currency: cart.cost.totalAmount.currencyCode,
      coupon: cart.discountCodes?.find((code) => code.applicable)?.code,
      items: cart.lines.map((line) => ({
        name: line.merchandise.product.title,
        price: (Number(line.cost.totalAmount.amount) / line.quantity).toFixed(
          2,
        ),
        quantity: line.quantity,
      })),
    };
  }
  return null;
}

export async function createCartAndSetCookie() {
  const country = (await cookies()).get("country")?.value || "FR";
  const cart = await createCart(country);
  if (cart.id) {
    (await cookies()).set("cartId", cart.id);
  }
}
