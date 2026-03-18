export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
}

export function computeDiscount(price: string, compareAtPrice: string): number {
  const p = parseFloat(price);
  const c = parseFloat(compareAtPrice);
  if (!c || c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}

export function computeSavings(price: string, compareAtPrice: string): number {
  const p = parseFloat(price);
  const c = parseFloat(compareAtPrice);
  if (!c || c <= p) return 0;
  return Math.round((c - p) * 100) / 100;
}
