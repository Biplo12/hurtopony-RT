import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type IFilters from "~/interfaces/IFilters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasActiveFilters = (filters: IFilters) => {
  return Object.values(filters).some((filter) => {
    return Object.values(filter as Record<string, unknown>).some((value) =>
      typeof value === "number" ? value !== 0 : value !== "",
    );
  });
};
