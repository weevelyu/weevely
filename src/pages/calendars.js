import { useState, useEffect } from "react"
import { getSession } from "next-auth/client"
import axios from "axios"

import Application from "../components/Layout"
import CalendarList from "../components/Calendars/CalendarList"
import NewCalendar from "../components/Calendars/NewCalendar"
import styles from "../styles/app.module.scss"

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function calendars({ session }) {
	const [calendars, setCalendars] = useState([])
	useEffect(() => {
		let cancel
		axios
			.get("http://localhost:3000/api/calendars", {
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((result) => {
				setCalendars(result.data.map((p) => p))
			})

		return () => cancel()
	}, [calendars])
	return (
		<Application session={session}>
			<h1 className={styles.pageTitle}>Your calendars</h1>
			<div className={styles.calendarList}>
				<CalendarList calendars={calendars} />
				<NewCalendar calendars={calendars} />
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

	return { props: { session: session } }
}
