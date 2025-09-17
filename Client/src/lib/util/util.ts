import { differenceInSeconds, format, formatDistanceToNow, type DateArg } from "date-fns";
import z from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MMM yyyy h:mm a');
}
export function timeAgo(date: DateArg<Date>) {
    const seconds = differenceInSeconds(new Date(), date)

    if (seconds < 60) {
        return "just now"
    }

    return formatDistanceToNow(date) + " ago"
}

export const requiredString = (fieldName: string) =>
  z.string({
    required_error: `${fieldName} est requis`,
    invalid_type_error: `${fieldName} doit être une chaîne`
  }).min(1,{message:`${fieldName} est requis`});