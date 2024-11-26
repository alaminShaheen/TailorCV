import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toastDateFormat(date: Date) {
  return `${new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(date)} at ${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date)}`;
}

export const formatFileName = (title: string, useHyphen: boolean = true) => {
  const delimiter = useHyphen ? "-" : "_";
  return title.trim().replace(/\s+/g, delimiter) + "pdf";
};
