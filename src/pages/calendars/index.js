import { useState } from "react"
import { getSession } from "next-auth/client"
import prisma from "../../../prisma"

import Application from "../../components/Layout"
import CalendarList from "../../components/Calendars/CalendarList"
import NewCalendar from "../../components/Calendars/NewCalendar"
import styles from "../../styles/app.module.scss"

export default function calendars({ session, data }) {
	const [calendars, setCalendars] = useState(data)
	return (
		<Application session={session} title='Your calendars'>
			<h1 className={styles.pageTitle}>Your calendars</h1>
			<div className={styles.calendarsPage}>
				<CalendarList
					calendars={calendars}
					setCalendars={setCalendars}
				/>
				<NewCalendar setCalendars={setCalendars} />
			</div>
		</Application>
	)
}

export async function getServerSideProps({ req, res }) {
	const session = await getSession({ req })
	if (!session) {
		res.writeHead(302, { Location: "/signin" })
		res.end()
		return {}
	}
	const calendars = await prisma.calendar.findMany({
		include: {
			events: true,
		},
	})

	return { props: { session: session, data: calendars } }
}
