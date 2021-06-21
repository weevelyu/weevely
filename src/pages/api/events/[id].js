import prisma from "../../../../prisma"
import { updateSchema } from "../../../schema/event"
import withValidation from "../../../middleware/withValidation"

async function handler(req, res) {
	const { method, query, body } = req
	switch (method) {
		case "GET":
			const event = await prisma.event.findUnique({
				where: {
					id: +query.id,
				},
			})
			event
				? res.status(200).json(event)
				: res.status(404).json({ message: "No such event found." })
			break
		case "PATCH":
			try {
				const updateEvent = await prisma.event.update({
					where: {
						id: +query.id,
					},
					data: body,
				})
				res.status(201).json({
					message: `Event successfully updated`,
					event: updateEvent,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({
							message: "No such event found.",
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
				await prisma.event.delete({
					where: {
						id: +query.id,
					},
				})
				res.status(201).json({
					message: `Event successfully deleted`,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({
							message: "No such event found.",
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
