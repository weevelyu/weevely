import { useState } from "react"
import nookies from "nookies"

import Application from "../../components/Layout"
import CalendarList from "../../components/Calendars/CalendarList"
import NewCalendar from "../../components/Calendars/NewCalendar"
import styles from "../../styles/app.module.scss"
import axios from "axios"

const Calendars = ({ user, data }) => {
	const [calendars, setCalendars] = useState(data)
	return (
		<Application user={user} title='Your calendars'>
			<h1 className={styles.pageTitle}>Your calendars</h1>
			<div className={styles.calendarsPage}>
				<CalendarList
					calendars={calendars}
					setCalendars={setCalendars}
					accessToken={user.token}
				/>
				<NewCalendar setCalendars={setCalendars} user={user} />
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	if (!!!cookie)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	const user = JSON.parse(cookie)
	const response = await axios.get(
		`${process.env.API_URL}/calendars/my/private`,
		{
			headers: {
				Accept: "application/json",
				Authorization: user.token,
			},
		}
	)
	return { props: { user: user, data: response.data } }
}

export default Calendars
