import { type ClassValue, clsx } from "clsx";
import { useFormatter } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useFormatDate(date: Date) {
  const format = useFormatter();
  return format.dateTime(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function useFormatPrice(price?: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price as number);
}
