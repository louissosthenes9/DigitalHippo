import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options:{
    currency?:"USD" | "TZS" | "EUR",
    notation?:Intl.NumberFormatOptions["notation"]
  }={}
){
  const { currency = 'USD', notation = 'compact'} = options
  const numberPrice = typeof price==="string"? parseFloat(price):price
  return Intl.NumberFormat("en-US",{
    style:"currency",
    currency:currency,
    notation,
    maximumFractionDigits:2,
  }).format(numberPrice)
}