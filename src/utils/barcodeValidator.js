export function isFoodBarcode(barcode) {
  return /^3|^4|^5|^6/.test(barcode);
}

export function isCosmeticBarcode(barcode) {
  return /^1|^7|^8|^9/.test(barcode);
}