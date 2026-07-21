/**
 * Pure formatting helpers, framework-agnostic and easy to unit test.
 */

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatCurrency(amount) {
  if (typeof amount !== "number") return "—";
  return currencyFormatter.format(amount);
}

export function formatDate(isoDate) {
  if (!isoDate) return "—";
  return dateFormatter.format(new Date(isoDate));
}
