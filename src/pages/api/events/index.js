import prisma from "../../../../prisma"
import { createSchema } from "../../../schema/event"
import withValidation from "../../../middleware/withValidation"

async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const events = await prisma.event.findMany()
			res.status(200).json(events)
			break
		case "POST":
			const event = await prisma.event.create({ data: req.body })
			if (!event.target) {
				let newTarget = new Date()
				newTarget.setDate(newTarget.getDate() + 1)
				await prisma.event.update({
					where: {
						id: event.id,
					},
					data: {
						target: newTarget.toISOString(),
					},
				})
				if (event.category == "Arrangement")
					await prisma.event.update({
						where: {
							id: event.id,
						},
						data: {
							duration: 6,
						},
					})
			}
			res.status(201).json({
				message: `Event successfully created`,
				event: event,
			})
			break
		default:
			res.setHeader("Allowed-Methods", ["GET", "POST"])
			res.status(405).end(
				`${req.method} method is not supported for this route. Allowed methods are GET and POST.`
			)
	}
}

export default withValidation(createSchema, handler)
