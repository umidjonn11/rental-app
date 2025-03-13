import z from "zod";

export const signUpSchema = z.object({
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(3).max(50),
	phone: z.string().min(12),
	address: z.string().optional(),
});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(50),
});