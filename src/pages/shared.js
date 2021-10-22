import axios from "axios"
import nookies from "nookies"
import { useState } from "react"
import Application from "../components/Layout"
import CalendarList from "../components/Calendars/CalendarList"
import styles from "../styles/app.module.scss"

const Shared = ({ user, data }) => {
	const [calendars, setCalendars] = useState(data)
	return (
		<Application user={user} title='Shared calendars'>
			<h1 className={styles.pageTitle}>Shared calendars</h1>
			<div className={styles.calendarsPage}>
				<CalendarList
					calendars={calendars}
					setCalendars={setCalendars}
					accessToken={user.token}
				/>
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
		`${process.env.API_URL}/calendars/my/shared`,
		{
			headers: {
				Accept: "application/json",
				Authorization: user.token,
			},
		}
	)
	return { props: { user: user, data: response.data } }
}

export default Shared
