import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateUserProfilePictureForm = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: "File size must be less than 5mb",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "File type must be jpeg, jpg or png",
    }),
});
