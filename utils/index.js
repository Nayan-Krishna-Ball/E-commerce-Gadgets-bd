//price foramating

export function formatPrice(amount) {
  if (typeof amount !== "number") return amount;
  return amount.toLocaleString("en-US");
}
