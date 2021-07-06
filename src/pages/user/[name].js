import { getSession } from "next-auth/client"
import prisma from "../../../prisma"

import UserBanner from "../../components/User/UserBanner"
import UserSharedCalendars from "../../components/User/UserSharedCalendars"
import styles from "../../styles/app.module.scss"
import Application from "../../components/Layout"

const user = ({ session, user, owner }) => {
	return (
		<Application session={session} title={user.name}>
			<h1 className={styles.pageTitle}>{user.name}</h1>
			<div className={styles.userPage}>
				<UserBanner user={user} owner={owner} />
				<UserSharedCalendars />
			</div>
		</Application>
	)
}

export async function getServerSideProps({ req, res, params }) {
	const session = await getSession({ req })
	if (!session) {
		res.writeHead(302, { Location: "/signin" }).end()
		return {}
	}
	const user = await prisma.user.findUnique({
		where: { name: params.name },
		include: {
			accounts: true,
			sessions: true,
		},
	})
	if (!user) {
		res.writeHead(302, { Location: "/404" }).end()
		return {}
	}

	return {
		props: {
			session: session,
			user: user,
			owner: session.user.name === user.name,
		},
	}
}

export default user
