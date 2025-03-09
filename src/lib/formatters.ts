/**
 * Formats runtime in hours and minutes
 * @param minutes - Runtime in minutes
 * @returns Formatted runtime string
 */
export const formatRuntime = (minutes: number) => {
  if (minutes <= 0) return "Unknown";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Formats a date string to a human-readable format
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

/**
 * Truncates a text string to a specified maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length of the truncated text
 * @returns Truncated text string
 */
export const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

/**
 * Extracts the year from a date string
 * @param dateString - Date string to extract year from
 * @returns Extracted year string
 */
export const extractYear = (dateString: string) => {
  if (!dateString) return "";
  return dateString.split("-")[0] ?? "";
};

/**
 * Formats a year string to a date string
 * @param year - Year string to format
 * @param isMin - Whether the year is the minimum or maximum year
 * @returns Formatted date string
 */
export const formatDateString = (year: string, isMin: boolean) => {
  if (!year || year.length < 4) return "";
  return isMin ? `${year}-01-01` : `${year}-12-31`;
};
