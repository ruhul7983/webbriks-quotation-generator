import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: '$' | '৳') {
  if (currency === '$') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  } else {
    // Number format for BDT with explicit symbol since "BDT" might show instead of ৳ in some locales
    const num = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
    return `BDT: ${num}`
  }
}

export function calculateSubtotal(items: { quantity: number, unitPrice: number }[]) {
  return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
}
