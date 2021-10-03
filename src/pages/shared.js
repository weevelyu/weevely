import nookies from "nookies"
import Application from "../components/Layout"
import styles from "../styles/app.module.scss"

export default function calendars({ user }) {
	return (
		<Application user={user} title='Shared calendars'>
			<h1 className={styles.pageTitle}>Shared calendars</h1>
			<div className={styles.calendarList}></div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	try {
		const user = JSON.parse(nookies.get(ctx).user)
		// const response = await axios.get(
		// 	"http://paxanddos.ddns.net:8000/api/calendars/my",
		// 	{
		// 		headers: {
		// 			Accept: "application/json",
		// 			Authorization: "Bearer " + user.token,
		// 		},
		// 	}
		// )
		return { props: { user: user } }
	} catch (e) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}
}
