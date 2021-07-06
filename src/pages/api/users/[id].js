import prisma from "../../../../prisma"
import { updateSchema } from "../../../schema/user"
import withValidation from "../../../middleware/withValidation"

async function handler(req, res) {
	const { method, query, body } = req
	switch (method) {
		case "GET":
			const user = await prisma.user.findUnique({
				where: {
					id: +query.id,
				},
			})
			user
				? res.status(200).json(user)
				: res.status(404).json({ message: "No such user found." })
			break
		case "PATCH":
			try {
				const { userId } = await prisma.session.findUnique({
					where: {
						accessToken: req.headers.authorization,
					},
				})
				const updateUser = await prisma.user.update({
					where: {
						id: +userId,
					},
					data: body,
				})
				res.status(201).json({
					message: `Account successfully updated`,
					user: updateUser,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({ message: "No such user found." })
						break
					default:
						res.status(400).json(e)
						break
				}
			}
			break
		case "DELETE":
			try {
				const userCalendars = await prisma.calendar.findMany({
					where: { authorId: +query.id },
				})
				for (const obj of userCalendars) {
					await prisma.event.deleteMany({
						where: { calendarId: obj.id },
					})
				}
				await prisma.user.update({
					where: { id: +query.id },
					data: { calendars: { deleteMany: {} } },
				})
				await prisma.user.delete({
					where: { id: +query.id },
				})
				res.status(201).json({
					message: `Account successfully deleted`,
				})
			} catch (e) {
				switch (e.code) {
					case "P2025":
						res.status(404).json({ message: "No such user found." })
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
