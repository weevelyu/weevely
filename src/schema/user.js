import { object, string } from "yup"

const createSchema = object({
	name: string().required().trim().min(2).max(16),
	email: string().required().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
})

const updateSchema = object({
	username: string().optional().trim().min(2).max(16),
	email: string().optional().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
})

export { createSchema, updateSchema }
