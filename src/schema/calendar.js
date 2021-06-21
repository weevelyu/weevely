import { object, string, number, boolean } from "yup"

const createSchema = object({
	authorId: number().required().min(1),
	title: string().optional().trim().max(16),
})

const updateSchema = object({
	title: string().optional().trim().max(16),
	hidden: boolean().optional(),
	shared: boolean().optional(),
})

export { createSchema, updateSchema }
