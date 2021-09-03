import { getSession } from "next-auth/client"
import { HolidayAPI } from "holidayapi"
import { IpregistryClient } from "@ipregistry/client"

import prisma from "../../../../prisma"
import styles from "../../../styles/app.module.scss"
import Application from "../../../components/Layout"
import BigCalendar from "../../../components/Calendars/BigCalendar"

const calendar = ({ session, calendar }) => {
	console.log(calendar)
	return (
		<Application session={session} title={calendar.title}>
			<h1 className={styles.pageTitle}>{calendar.title}</h1>
			<div className={styles.calendarPage}>
				<BigCalendar calendar={calendar} />
			</div>
		</Application>
	)
}

export async function getServerSideProps({ req, res, params }) {
	const session = await getSession({ req })
	if (!session) {
		res.writeHead(302, { Location: "/signin" }).end()
		return {}
	}
	const calendar = await prisma.calendar.findUnique({
		where: {
			id: +params.id,
		},
		include: {
			events: true,
		},
	})

	if (calendar.main && calendar.events.length === 0) {
		const ip = req.headers["x-real-ip"] || req.connection.remoteAddress

		const key = process.env.HOLIDAY_API_KEY
		const holidayApi = new HolidayAPI({ key })
		const ipRegistry = new IpregistryClient(process.env.IPREGISTRY_API_KEY)

		const response = await ipRegistry.lookup(ip)
		const country = response.data.location.country.code
		const year = new Date().getFullYear()

		const holidays = await holidayApi.holidays({
			country: country,
			year: year - 1,
		})

		for (const holiday of holidays.holidays) {
			const date = new Date(holiday.date)
			date.setFullYear(date.getFullYear() + 1)
			await prisma.event.create({
				data: {
					calendarId: calendar.id,
					title: holiday.name,
					content: holiday.name,
					category: "Arrangement",
					target: date,
					duration: 24,
					system: true,
				},
			})
		}
	}

	return { props: { session: session, calendar: calendar } }
}

export default calendar
