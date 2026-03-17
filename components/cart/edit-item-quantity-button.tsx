"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { updateItemQuantity } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: (merchandiseId: string, action: "plus" | "minus") => void;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const updateAction = formAction.bind(null, payload);

  return (
    <form
      action={() => {
        startTransition(async () => {
          optimisticUpdate(payload.merchandiseId, type);
          await updateAction();
          router.refresh();
        });
      }}
    >
      <button
        type="submit"
        aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
        className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-wk-grey-100"
      >
        {type === "plus" ? (
          <PlusIcon className="h-4 w-4 text-wk-grey-500" />
        ) : (
          <MinusIcon className="h-4 w-4 text-wk-grey-500" />
        )}
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
