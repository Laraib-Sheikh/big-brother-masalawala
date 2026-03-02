/**
 * `amountMinor` is in minor currency units (e.g. cents/paise).
 * For PKR, we format as "Rs.120.00" to match common local storefront display.
 */
export function formatMoney(amountMinor: number, currency: "USD" | "PKR" = "PKR") {
  const amount = amountMinor / 100;

  if (currency === "PKR") {
    return `Rs.${amount.toFixed(2)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

