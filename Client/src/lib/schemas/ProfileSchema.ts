import { z } from "zod";
import { requiredString } from "../util/util";

export const profileSchema = z.object({
    displayName: requiredString('Display Name'),
    bio: z.string().max(255, { message: "Bio must be at most 255 characters" }).optional()
});

// 🔥 Type inferé depuis le schém
export type ProfileSchema = z.infer<typeof profileSchema>;
