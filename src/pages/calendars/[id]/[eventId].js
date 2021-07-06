import { getSession } from "next-auth/client"

import styles from "../../../styles/app.module.scss"
import Application from "../../../components/Layout"

const event = ({ session }) => {
	return (
		<Application session={session}>
			<h1 className={styles.pageTitle}>Your account</h1>
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

export default event
