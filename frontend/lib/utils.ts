import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanPhoneNumber(phone: string): string {
  // Strips plus signs, spaces, hyphens, parentheses to create clean numeric WhatsApp target
  return phone.replace(/[^\d]/g, '');
}
