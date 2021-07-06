import { getSession } from "next-auth/client"

import Application from "../components/Layout"
import styles from "../styles/app.module.scss"

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function calendars({ session }) {
	return (
		<Application session={session} title='Shared calendars'>
			<h1 className={styles.pageTitle}>Shared calendars</h1>
			<div className={styles.calendarList}></div>
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
