import { HolidayAPI } from "holidayapi"
import nookies from "nookies"
import axios from "axios"
import styles from "../../../styles/app.module.scss"
import Application from "../../../components/Layout"
import BigCalendar from "../../../components/Calendars/BigCalendar"

const calendar = ({ user, calendar }) => {
	return (
		<Application user={user} title={calendar.title}>
			<h1 className={styles.pageTitle}>{calendar.title}</h1>
			<div className={styles.calendarPage}>
				<BigCalendar calendar={calendar} />
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	//try {
	const user = JSON.parse(nookies.get(ctx).user)
	const response = await axios.get(
		`${process.env.API_URL}/api/calendars/${ctx.params.id}`,
		{
			headers: {
				Accept: "application/json",
				Authorization: user.token,
			},
		}
	)
	// } catch (e) {
	// 	ctx.res.writeHead(303, { Location: "/signin" })
	// 	ctx.res.end()
	// }

	if (response.data.main && response.data.events.length === 0) {
		const key = process.env.HOLIDAY_API_KEY
		const ipres = await axios.get(`https://checkip.amazonaws.com/`)
		const countryres = await axios.get(
			`http://ip-api.com/json/${ipres.data}`
		)
		const holidayApi = new HolidayAPI({ key })
		const country = countryres.data.countryCode
		const year = new Date().getFullYear()
		const holidays = await holidayApi.holidays({
			country: country,
			year: year - 1,
		})
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			data: {
				holidays: holidays.holidays,
			},
			url: `${process.env.API_URL}/api/calendars/${ctx.params.id}/holidays`,
		}
		const holidayres = await axios.post(api.url, api.data, {
			headers: api.headers,
		})
		console.log(holidayres)
	}

	return {
		props: { user: user, calendar: response.data },
	}
}

export default calendar
