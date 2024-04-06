import { z } from "zod";

export const commentFormSchema = z.object({
  content: z
    .string()
    .max(300, { message: "Must be less than 300 characters" })
    .trim()
    .min(1),
});
