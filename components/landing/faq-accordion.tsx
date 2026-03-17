"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatedElement } from "components/ui/animated-element";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={clsx("mx-auto max-w-3xl", className)}>
      {items.map((item, i) => (
        <AnimatedElement key={item.question} delay={i * 0.04}>
          <Disclosure as="div" className="border-b border-wk-grey-200">
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between py-5 text-left">
                  <span className="pr-4 text-[15px] font-semibold text-wk-black md:text-base">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={clsx(
                      "h-4 w-4 flex-none text-wk-grey-400 transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                </DisclosureButton>
                <DisclosurePanel className="pb-5 text-sm leading-relaxed text-wk-grey-500 md:text-[15px]">
                  {item.answer}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </AnimatedElement>
      ))}
    </div>
  );
}
