import { object, string, mixed } from "yup"

const createSchema = object({
	username: string().required().trim().min(2).max(16),
	email: string().required().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
	password: string()
		.required()
		.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
	passwordConfirmation: mixed()
		.required()
		.test("match", "Passwords do not match", function () {
			return this.parent.password === this.parent.passwordConfirmation
		}),
})

const updateSchema = object({
	username: string().optional().trim().min(2).max(16),
	email: string().optional().trim().email(),
	role: string().optional().oneOf(["USER", "ADMIN"]),
})

export { createSchema, updateSchema }
