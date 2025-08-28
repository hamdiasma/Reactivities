import { z } from "zod";
import { requiredString } from "../util/util";

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date({   // accepte string et convertit en Date
    required_error: "Date est requise",
    invalid_type_error: "Date invalide"
  }),
  location: z.object({
    city: requiredString('City'),
    venue: requiredString('aVENU'),
    latitude: z.coerce.number(),
    langitude: z.coerce.number()
  })
});

// 🔥 Type inferé depuis le schéma
export type ActivitySchema = z.infer<typeof activitySchema>;
