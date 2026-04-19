import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn is a utility function that safely merges tailwind classes
// twMerge removes conflicting tailwind rules
// clsx handles conditional class joining
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}


