import { formatDistanceToNow, format } from "date-fns";

export function getRelativeTimeOrFormattedDateTime(dateString: string): {
  relativeDateTime: string;
  formattedDateTime: string;
} {
  const date = new Date(dateString);
  const formattedDateTime = format(date, "yyyy-MM-dd HH:mm:ss");
  const relativeDateTime = formatDistanceToNow(date, { addSuffix: true });

  return { relativeDateTime, formattedDateTime };
}
