import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns an appropriate CSS class for the rating color based on the rating value
 */
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return "bg-green-500";
  if (rating >= 6) return "bg-yellow-500";
  return "bg-red-500";
};
