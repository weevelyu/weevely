import prisma from "../../../../prisma"
import { createSchema } from "../../../schema/user"
import withValidation from "../../../middleware/withValidation"

async function handler(req, res) {
	switch (req.method) {
		case "GET":
			const users = await prisma.user.findMany()
			res.status(200).json(users)
			break
		case "POST":
			const user = await prisma.user.create({
				data: {
					name: req.body.username,
					email: req.body.email,
					calendars: {
						create: [{ title: "My calendar", main: true }],
					},
				},
			})
			res.status(201).json({
				message: `Account successfully created`,
				user: user,
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
