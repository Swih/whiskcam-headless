"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
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
      (line) => line.merchandise.id === merchandiseId
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
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
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

export async function redirectToCheckout() {
  const cart = await getCart();
  if (cart?.checkoutUrl) {
    // Shopify returns checkout URLs with the custom domain (whiskcam.com),
    // but checkout must be served by Shopify directly. Replace with myshopify domain.
    const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
    let url = cart.checkoutUrl;
    if (shopifyDomain && !url.includes(".myshopify.com")) {
      url = url.replace(
        /https?:\/\/[^/]+/,
        `https://${shopifyDomain}`
      );
    }
    redirect(url);
  }
  redirect("/");
}

export async function createCartAndSetCookie() {
  const country = (await cookies()).get("country")?.value || "FR";
  const cart = await createCart(country);
  if (cart.id) {
    (await cookies()).set("cartId", cart.id);
  }
}
