"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { PRODUCT_HANDLE, DUO_PRODUCT_HANDLE } from "lib/content";
import {
  DeliveryInfo,
  isServedCountry,
  useDeliveryCountry,
} from "components/delivery-info";
import { useHalloweenCampaign } from "components/campaign/use-halloween-campaign";
import { isSeasonalCode, isCampaignProduct } from "lib/campaign";
import { getCampaignCopy } from "lib/campaign-copy";
import { StorageNotice } from "components/landing/storage-notice";
import { DEFAULT_OPTION } from "lib/constants";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, prepareCheckout } from "./actions";
import { trackBeginCheckout } from "components/analytics";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import { useLocale, useTranslations } from "next-intl";

export default function CartModal() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const campaignActive = useHalloweenCampaign();
  const campaign = getCampaignCopy(locale, campaignActive);
  const deliveryCountry = useDeliveryCountry()?.country;
  const unsupported = !!deliveryCountry && !isServedCountry(deliveryCountry);
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    const quantity = cart?.totalQuantity ?? 0;
    if (quantity > (quantityRef.current ?? 0)) {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
    quantityRef.current = quantity;
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  const hasItems = cart && cart.lines.length > 0;
  const campaignApplied = !!cart?.discountCodes?.some(
    (code) =>
      code.code.toUpperCase() === campaignActive?.code && code.applicable,
  );
  const campaignEligible = !!cart?.lines.some((line) =>
    isCampaignProduct(line.merchandise.product.handle),
  );
  const otherOfferApplied = !!cart?.discountCodes?.some(
    (code) => !isSeasonalCode(code.code) && code.applicable,
  );

  return (
    <>
      <button aria-label={t("title")} onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-white text-wk-black shadow-2xl md:w-[420px]">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-wk-grey-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-wk-black" />
                  <Dialog.Title className="text-base font-semibold">
                    {t("title")}
                  </Dialog.Title>
                  {hasItems && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-wk-black text-[10px] font-bold text-white">
                      {cart.totalQuantity}
                    </span>
                  )}
                </div>
                <button
                  aria-label={t("close")}
                  onClick={closeCart}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-wk-grey-100"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {!hasItems ? (
                /* Empty cart */
                <div className="flex flex-1 flex-col items-center justify-center px-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-wk-grey-50">
                    <ShoppingCartIcon className="h-10 w-10 text-wk-grey-300" />
                  </div>
                  <p className="mt-4 text-lg font-semibold">{t("empty")}</p>
                  <p className="mt-1 text-sm text-wk-grey-500">
                    {t("emptySubtext")}
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 rounded-[var(--radius-btn)] bg-wk-black px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(245,166,35,0.3)]"
                  >
                    {t("startShopping")}
                  </button>
                </div>
              ) : (
                <>
                  {/* Free shipping bar */}
                  <div className="border-b border-wk-grey-100 bg-wk-green/5 px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-wk-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-xs font-semibold text-wk-green">
                        {t("freeShippingBanner")}
                      </p>
                    </div>
                  </div>

                  {/* Cart items */}
                  <div className="min-h-40 flex-1 overflow-auto px-5">
                    <ul className="divide-y divide-wk-grey-100">
                      {cart.lines
                        .sort((a, b) =>
                          a.merchandise.product.title.localeCompare(
                            b.merchandise.product.title,
                          ),
                        )
                        .map((item, i) => (
                          <li key={i} className="py-4">
                            <div className="flex gap-3">
                              {/* Product image */}
                              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border border-wk-grey-100 bg-wk-grey-50">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={80}
                                  height={80}
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText || item.merchandise.product.title
                                  }
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                />
                              </div>

                              {/* Product details */}
                              <div className="flex flex-1 flex-col justify-between">
                                <div>
                                  <p className="text-sm font-semibold leading-tight">
                                    {item.merchandise.product.handle ===
                                    PRODUCT_HANDLE
                                      ? "Whiskcam Original"
                                      : item.merchandise.product.handle ===
                                          DUO_PRODUCT_HANDLE
                                        ? t("duoName")
                                        : item.merchandise.product.title}
                                  </p>
                                  {item.merchandise.title !==
                                    DEFAULT_OPTION && (
                                    <p className="mt-0.5 text-xs text-wk-grey-500">
                                      {item.merchandise.title.includes(
                                        "MicroSD not included",
                                      )
                                        ? t("cardNotIncluded")
                                        : item.merchandise.title}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  {/* Quantity controls */}
                                  <div className="flex items-center rounded-full border border-wk-grey-200">
                                    <EditItemQuantityButton
                                      item={item}
                                      type="minus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                    <span className="w-8 text-center text-sm font-medium">
                                      {item.quantity}
                                    </span>
                                    <EditItemQuantityButton
                                      item={item}
                                      type="plus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>
                                  {/* Price */}
                                  <Price
                                    className="text-sm font-semibold"
                                    amount={item.cost.totalAmount.amount}
                                    currencyCode={
                                      item.cost.totalAmount.currencyCode
                                    }
                                  />
                                </div>
                              </div>

                              {/* Delete button */}
                              <div className="flex-none pt-0.5">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3 border-t border-wk-grey-100 py-4">
                      <Image
                        src="/images/product/gift-adapter.webp"
                        alt={t("includedAdapter")}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                      <p className="text-sm text-wk-grey-600">
                        {t("includedAdapter")}
                      </p>
                    </div>
                  </div>

                  {/* Footer — totals + checkout */}
                  <div className="shrink-0 border-t border-wk-grey-100 bg-wk-grey-50 px-5 pb-5 pt-4">
                    {campaignActive &&
                      campaignEligible &&
                      !otherOfferApplied && (
                        <div className="mb-3 border-l-2 border-[#b8430f] pl-3 text-sm text-wk-black">
                          <strong>
                            {campaignApplied
                              ? campaign.applied
                              : campaign.pending}
                          </strong>
                          {campaignApplied && (
                            <p className="mt-1 text-sm">{campaign.code}</p>
                          )}
                          <p className="mt-1 text-sm text-wk-grey-600">
                            {campaign.deadline}
                          </p>
                        </div>
                      )}

                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-wk-grey-500">
                          {t("subtotal")}
                        </span>
                        <Price
                          className="font-medium"
                          amount={cart.cost.subtotalAmount.amount}
                          currencyCode={cart.cost.subtotalAmount.currencyCode}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-wk-grey-500">
                          {t("shipping")}
                        </span>
                        <span className="max-w-48 text-right text-sm text-wk-grey-600">
                          {campaign.shipping}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-wk-grey-200 pt-3">
                      <span className="text-base font-bold">{t("total")}</span>
                      <Price
                        className="text-lg font-bold"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>

                    <StorageNotice />
                    <DeliveryInfo compact />

                    {/* Checkout button */}
                    <form
                      action={async () => {
                        setCheckoutError(false);
                        try {
                          const checkout = await prepareCheckout();
                          if (!checkout) {
                            setCheckoutError(true);
                            return;
                          }
                          // Measurement uses Shopify's synchronized price. Tracking
                          // failures must never prevent a buyer reaching checkout.
                          try {
                            trackBeginCheckout(checkout);
                          } finally {
                            window.location.assign(checkout.url);
                          }
                        } catch {
                          setCheckoutError(true);
                        }
                      }}
                      className="mt-4"
                    >
                      <CheckoutButton blocked={unsupported} />
                      {checkoutError && (
                        <p role="alert" className="mt-2 text-sm text-red-700">
                          {campaign.checkoutError}
                        </p>
                      )}
                    </form>

                    {/* Trust line */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-wk-grey-600">
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        {t("secureCheckout")}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        {t("moneyBack")}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton({ blocked = false }: { blocked?: boolean }) {
  const { pending } = useFormStatus();
  const t = useTranslations("cart");

  return (
    <button
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-wk-amber px-6 py-3.5 text-base font-semibold text-wk-black transition-colors hover:bg-wk-amber-hover disabled:opacity-60"
      type="submit"
      disabled={pending || blocked}
    >
      {pending ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      )}
      {pending ? t("processing") : t("checkout")}
    </button>
  );
}
