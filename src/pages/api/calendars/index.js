import prisma from "../../../../prisma"
import { createSchema } from "../../../schema/calendar"
import withValidation from "../../../middleware/withValidation"

async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const calendars = await prisma.calendar.findMany()
			res.status(200).json(calendars)
			break
		case "POST":
			const { userId } = await prisma.session.findUnique({
				where: {
					accessToken: req.headers.authorization,
				},
			})
			const userCalendars = await prisma.calendar.count({
				where: {
					authorId: +userId,
				},
			})
			let calendar
			if (userCalendars === 0) {
				calendar = await prisma.calendar.create({
					data: {
						authorId: +userId,
						title: req.body.title,
						main: true,
					},
				})
			} else {
				calendar = await prisma.calendar.create({
					data: {
						authorId: +userId,
						title: req.body.title,
						main: false,
					},
				})
			}
			res.status(201).json({
				message: `Calendar successfully created`,
				calendar: calendar,
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
