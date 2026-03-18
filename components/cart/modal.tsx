"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

const FREE_GIFTS = [
  { name: "32GB MicroSD Card", value: "12.90", image: "/images/product/gift-microsd.jpg" },
  { name: "USB-C Adapter", value: "9.90", image: "/images/product/gift-adapter.jpg" },
];

export default function CartModal({ savingsPerUnit, currencyCode: propCurrencyCode }: { savingsPerUnit?: number; currencyCode?: string }) {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  const hasItems = cart && cart.lines.length > 0;
  const resolvedCurrency = cart?.cost.totalAmount.currencyCode || propCurrencyCode || "EUR";
  const currencySymbol = resolvedCurrency === "USD" ? "$" : "€";
  const totalSavings = savingsPerUnit && cart ? savingsPerUnit * cart.totalQuantity : 0;

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white text-wk-black shadow-2xl md:w-[420px]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-wk-grey-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-wk-black" />
                  <p className="text-base font-semibold">Your Cart</p>
                  {hasItems && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-wk-black text-[10px] font-bold text-white">
                      {cart.totalQuantity}
                    </span>
                  )}
                </div>
                <button
                  aria-label="Close cart"
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
                  <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
                  <p className="mt-1 text-sm text-wk-grey-500">Add Whiskcam to get started</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 rounded-[var(--radius-btn)] bg-wk-black px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(245,166,35,0.3)]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Free shipping bar */}
                  <div className="border-b border-wk-grey-100 bg-wk-green/5 px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-wk-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs font-semibold text-wk-green">
                        You qualify for FREE worldwide shipping!
                      </p>
                    </div>
                  </div>

                  {/* Cart items */}
                  <div className="flex-1 overflow-auto px-5">
                    <ul className="divide-y divide-wk-grey-100">
                      {cart.lines
                        .sort((a, b) =>
                          a.merchandise.product.title.localeCompare(b.merchandise.product.title)
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
                                  alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>

                              {/* Product details */}
                              <div className="flex flex-1 flex-col justify-between">
                                <div>
                                  <p className="text-sm font-semibold leading-tight">
                                    {item.merchandise.product.title}
                                  </p>
                                  {item.merchandise.title !== DEFAULT_OPTION && (
                                    <p className="mt-0.5 text-xs text-wk-grey-500">
                                      {item.merchandise.title}
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
                                    currencyCode={item.cost.totalAmount.currencyCode}
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

                    {/* Free gifts */}
                    <div className="border-t border-wk-grey-100 py-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-wk-amber">
                        🎁 Free gifts included
                      </p>
                      {FREE_GIFTS.map((gift) => (
                        <div key={gift.name} className="flex items-center gap-2.5 py-1.5">
                          <div className="relative h-10 w-10 flex-none overflow-hidden rounded-lg border border-wk-grey-100 bg-white">
                            <Image src={gift.image} alt={gift.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-wk-black">{gift.name}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-wk-grey-400 line-through">{currencySymbol}{gift.value}</span>
                            <span className="text-xs font-bold text-wk-green">FREE</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2.5 py-1.5">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-wk-grey-100 bg-white">
                          <svg className="h-4 w-4 text-wk-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-wk-black">Free Worldwide Shipping</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-wk-grey-400 line-through">{currencySymbol}7.90</span>
                          <span className="text-xs font-bold text-wk-green">FREE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer — totals + checkout */}
                  <div className="border-t border-wk-grey-100 bg-wk-grey-50 px-5 pb-5 pt-4">
                    {/* Savings */}
                    <div className="mb-3 flex items-center justify-center gap-1.5 rounded-lg bg-wk-green/5 px-3 py-2">
                      <svg className="h-3.5 w-3.5 text-wk-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs font-semibold text-wk-green">
                        You&apos;re saving {currencySymbol}{totalSavings.toFixed(2)} on this order
                      </span>
                    </div>

                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-wk-grey-500">Subtotal</span>
                        <Price
                          className="font-medium"
                          amount={cart.cost.subtotalAmount.amount}
                          currencyCode={cart.cost.subtotalAmount.currencyCode}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-wk-grey-500">Shipping</span>
                        <span className="text-xs font-semibold text-wk-green">FREE</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-wk-grey-200 pt-3">
                      <span className="text-base font-bold">Total</span>
                      <Price
                        className="text-lg font-bold"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>

                    {/* Checkout button */}
                    <form action={redirectToCheckout} className="mt-4">
                      <CheckoutButton />
                    </form>

                    {/* Trust line */}
                    <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-wk-grey-400">
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Secure checkout
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                        30-day money back
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

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-wk-black px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(245,166,35,0.3)] active:scale-[0.98] disabled:opacity-70"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )}
      {pending ? "Processing..." : "Complete My Order"}
    </button>
  );
}
