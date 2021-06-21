import { object, string, number, date } from "yup"

const createSchema = object({
	calendarId: number().required().min(1),
	title: string().optional().trim().max(16),
	content: string().optional().trim().max(255),
	category: string()
		.optional()
		.trim()
		.oneOf(["Arrangement", "Reminder", "Task"]),
	target: date().optional(),
	duration: number().optional().min(1),
})

const updateSchema = object({
	title: string().optional().trim().max(16),
	content: string().optional().trim().max(255),
	category: string()
		.optional()
		.trim()
		.oneOf(["Arrangement", "Reminder", "Task"]),
	target: date().optional(),
	duration: number().optional().min(1),
})

export { createSchema, updateSchema }
