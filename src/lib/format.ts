import { useFormatter } from "next-intl";

export function useFormatDate(date?: string | Date) {
  const format = useFormatter();
  const dateTime = new Date(date as string);

  return format.dateTime(dateTime, {
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
