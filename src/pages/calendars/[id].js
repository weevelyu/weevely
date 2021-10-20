import nookies from "nookies"
import axios from "axios"
import styles from "../../styles/app.module.scss"
import Application from "../../components/Layout"
import BigCalendar from "../../components/Calendars/BigCalendar"
import addHolidays from "../../lib/helpers/addHolidays"

const calendar = ({ user, calendar }) => {
	if (calendar.main && calendar.events.length === 0)
		addHolidays(calendar.id, user.token).then(() => location.reload())
	return (
		<Application user={user} title={calendar.title}>
			<h1 className={styles.pageTitle}>{calendar.title}</h1>
			<div className={styles.calendarPage}>
				<BigCalendar calendar={calendar} accessToken={user.token} />
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	if (!cookie) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}

	const user = JSON.parse(cookie)
	const response = await axios.get(
		`${process.env.API_URL}/calendars/${ctx.params.id}`,
		{
			headers: {
				Accept: "application/json",
				Authorization: user.token,
			},
		}
	)

	return {
		props: { user: user, calendar: response.data },
	}
}

export default calendar
