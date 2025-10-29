export function isFoodBarcode(barcode) {
  if (!barcode || typeof barcode !== "string") return false;

  // Allow all barcodes with valid length (12–14 digits)
  const isValidLength = barcode.length >= 12 && barcode.length <= 14;

  // Optional: allow only numeric barcodes
  const isNumeric = /^\d+$/.test(barcode);

  return isValidLength && isNumeric;
}