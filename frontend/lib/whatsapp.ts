import { cleanPhoneNumber } from './utils';

/**
 * Builds a standard WhatsApp deep link.
 * Pre-populates the message with company context, product name, and product SKU.
 */
export function buildWhatsAppInquiryUrl(params: {
  phone: string;
  productName?: string;
  productCode?: string;
  customMessage?: string;
}): string {
  const cleanPhone = cleanPhoneNumber(params.phone || "8801700000000");

  let message = "";
  if (params.customMessage) {
    message = params.customMessage;
  } else if (params.productName) {
    message = `Hello New Rahad Hosiery & Garments, I am interested in inquiring about your manufactured product: "${params.productName}" (Code: ${params.productCode || 'N/A'}). Please provide more details.`;
  } else {
    message = "Hello New Rahad Hosiery & Garments, I would like to inquire about your manufactured hosiery and baby wear products.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
