import { getSession } from "next-auth/client"

import prisma from "../../../../prisma"
import styles from "../../../styles/app.module.scss"
import Application from "../../../components/Layout"

const calendar = ({ session, calendar }) => {
	console.log(calendar)
	return (
		<Application session={session} title={calendar.title}>
			<h1 className={styles.pageTitle}>{calendar.title}</h1>
		</Application>
	)
}

export async function getServerSideProps({ req, res, params }) {
	const session = await getSession({ req })
	if (!session) {
		res.writeHead(302, { Location: "/signin" })
		res.end()
		return {}
	}
	const calendar = await prisma.calendar.findUnique({
		where: {
			id: +params.id,
		},
	})

	return { props: { session: session, calendar: calendar } }
}

export default calendar
