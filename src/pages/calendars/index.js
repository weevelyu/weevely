import { useState } from "react"
import nookies from "nookies"

import Application from "../../components/Layout"
import CalendarList from "../../components/Calendars/CalendarList"
import NewCalendar from "../../components/Calendars/NewCalendar"
import styles from "../../styles/app.module.scss"
import axios from "axios"

export default function calendars({ user, data }) {
	const [calendars, setCalendars] = useState(data)
	console.log(user, calendars)
	return (
		<Application user={user} title='Your calendars'>
			<h1 className={styles.pageTitle}>Your calendars</h1>
			<div className={styles.calendarsPage}>
				<CalendarList
					calendars={calendars}
					setCalendars={setCalendars}
					accessToken={user.token}
				/>
				<NewCalendar
					setCalendars={setCalendars}
					accessToken={user.token}
				/>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	try {
		const user = JSON.parse(nookies.get(ctx).user)
		const response = await axios.get(
			`${process.env.API_URL}/api/calendars/my`,
			{
				headers: {
					Accept: "application/json",
					Authorization: user.token,
				},
			}
		)
		return { props: { user: user, data: response.data } }
	} catch (e) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}
}
