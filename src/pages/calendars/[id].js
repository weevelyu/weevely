import nookies from "nookies"
import axios from "axios"
import styles from "../../styles/app.module.scss"
import Application from "../../components/Layout"
import BigCalendar from "../../components/Calendars/BigCalendar"

const calendar = ({ user, calendar }) => {
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
	try {
		const user = JSON.parse(nookies.get(ctx).user)
		const response = await axios.get(
			`${process.env.API_URL}/calendars/${ctx.params.id}`,
			{
				headers: {
					Accept: "application/json",
					Authorization: user.token,
				},
			}
		)

		if (response.data.main && response.data.events.length === 0) {
			const ip = await axios.get(`https://checkip.amazonaws.com/`)
			const location = await axios.get(
				`http://ip-api.com/json/${ip.data}`
			)
			const api = {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: user.token,
				},
				data: {
					country: location.data.countryCode,
					year: new Date().getFullYear() - 1,
				},
				url: `${process.env.API_URL}/calendars/${ctx.params.id}/holidays`,
			}
			await axios.post(api.url, api.data, { headers: api.headers })
		}

		return {
			props: { user: user, calendar: response.data },
		}
	} catch (e) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}
}

export default calendar
