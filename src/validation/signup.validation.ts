import { z } from "zod";

const signupFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(/^[a-zA-Z0-9._%+-]+@[^.]+\.edu(?:\.[a-zA-Z]{2,})?$/, {
      message: "Please enter a valid .edu email address",
    }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default signupFormSchema;
