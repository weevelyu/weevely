import prisma from "../../../../../prisma"
import { updateSchema } from "../../../../schema/calendar"
import withValidation from "../../../../middleware/withValidation"

async function handler(req, res) {
	const { method, query, body } = req
	switch (method) {
		case "GET":
			const calendar = await prisma.calendar.findUnique({
				where: {
					id: +query.id,
				},
			})
			calendar
				? res.status(200).json(calendar)
				: res.status(404).json({ message: "No such calendar found." })
			break
		case "PATCH":
			try {
				const updateCalendar = await prisma.calendar.update({
					where: {
						id: +query.id,
					},
					data: body,
				})
				res.status(201).json({
					message: `Calendar successfully updated`,
					calendar: updateCalendar,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({
							message: "No such calendar found.",
						})
						break
					default:
						res.status(400).json(e)
						break
				}
			}
			break
		case "DELETE":
			try {
				const calendar = await prisma.calendar.update({
					where: { id: +query.id },
					data: { events: { deleteMany: {} } },
				})
				if (calendar.main)
					return res.status(405).json({
						message: `Can not delete your main calendar`,
					})
				await prisma.calendar.update({
					where: { id: +query.id },
					data: { events: { deleteMany: {} } },
				})
				await prisma.calendar.delete({
					where: {
						id: +query.id,
					},
				})
				res.status(201).json({
					message: `Calendar successfully deleted`,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({
							message: "No such calendar found.",
						})
						break
					default:
						res.status(400).json(e)
						break
				}
			}
			break
		default:
			res.setHeader("Allowed-Methods", ["GET", "PATCH", "DELETE"])
			res.status(405).end(
				`${method} method is not supported for this route. Allowed methods are GET, PATCH and DELETE.`
			)
	}
}

export default withValidation(updateSchema, handler)
