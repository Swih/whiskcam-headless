import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      <ShoppingCartIcon
        className={clsx(
          "h-5 w-5 transition-transform duration-200 ease-out hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <span className="absolute top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-wk-amber text-[9px] font-bold leading-none text-wk-black">
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
