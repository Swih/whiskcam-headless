"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeItem } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: (merchandiseId: string, action: "delete") => void;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const merchandiseId = item.merchandise.id;
  const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
      action={() => {
        startTransition(async () => {
          optimisticUpdate(merchandiseId, "delete");
          await removeItemAction();
          router.refresh();
        });
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-wk-grey-500 transition-colors hover:bg-wk-black"
      >
        <XMarkIcon className="h-4 w-4 text-white" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
