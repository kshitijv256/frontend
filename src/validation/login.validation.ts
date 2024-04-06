import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(/^[a-zA-Z0-9._%+-]+@[^.]+\.edu(?:\.[a-zA-Z]{2,})?$/, {
      message: "Email must be a .edu email address",
    }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default loginFormSchema;
