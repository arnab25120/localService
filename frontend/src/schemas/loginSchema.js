import {z} from "zod";

export const loginSchema=z.object({
    email:z.email("Invalid email").nonempty("Email is required"),
    password:z.string().min(6,"Password must be atleast 6 characters"),
});