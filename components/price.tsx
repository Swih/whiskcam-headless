import { useLocale } from "next-intl";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
}: {
  amount: string;
  className?: string;
  currencyCode: string;
} & React.ComponentProps<"p">) => {
  const locale = useLocale();
  return (
    <p className={className}>
      {`${new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
    </p>
  );
};

export default Price;
