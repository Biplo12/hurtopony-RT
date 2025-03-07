export const formatRuntime = (minutes: number) => {
  if (minutes <= 0) return "Unknown";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};
