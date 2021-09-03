import { object, string } from "yup"

const createSchema = object({
	name: string().required().trim().min(2).max(16),
	email: string().required().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
	shareID: string().required().trim().min(6).max(16),
})

const updateSchema = object({
	name: string().optional().trim().min(2).max(16),
	email: string().optional().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
})

export { createSchema, updateSchema }
