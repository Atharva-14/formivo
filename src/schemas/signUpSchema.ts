import { string, z } from "zod";

export const signUpSchema = z.object({
  username: string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(20, { message: "Username must be atleast 20 characters long" })
    .regex(/^[a-zA-Z ]+$/, "Username must not contain special characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
