import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const postFormSchema = z.object({
  title: z
    .string()
    .max(80, { message: "Title must be at most 80 characters long" })
    .optional(),
  content: z
    .string()
    .max(1000, { message: "Must be less than 1000 characters" })
    .trim()
    .min(1),
  media: z
    .instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: "File size must be less than 5mb",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "File type must be jpeg, jpg or png",
    })
    .optional(),
});

export const pollFormSchema = z.object({
  title: z
    .string()
    .max(80, { message: "Title must be at most 80 characters long" })
    .optional(),
  content: z
    .string()
    .max(150, { message: "Must be less than 150 characters" })
    .trim()
    .min(1),
  media: z
    .instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: "File size must be less than 5mb",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "File type must be jpeg, jpg or png",
    })
    .optional(),
  options: z
    .array(
      z.object({
        content: z
          .string()
          .max(100, { message: "Option must be at most 100 characters long" })
          .trim()
          .min(1),
        media: z
          .instanceof(File)
          .refine((file) => file.size < 5000000, {
            message: "File size must be less than 5mb",
          })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "File type must be jpeg, jpg or png",
          })
          .optional(),
      }),
    )
    .min(2),
});
