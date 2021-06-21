import prisma from "../../../../../prisma"

export default async function handler(req, res) {
	const { method, query } = req
	switch (method) {
		case "DELETE":
			try {
				const calendar = await prisma.calendar.update({
					where: { id: +query.id },
					data: { events: { deleteMany: {} } },
				})
				res.status(200).json({
					message: `All event are deleted from ${calendar.title}`,
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
			res.setHeader("Allowed-Methods", ["DELETE"])
			res.status(405).end(
				`${method} method is not supported for this route. Allowed method is DELETE.`
			)
	}
}
