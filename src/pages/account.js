import { getSession } from "next-auth/client"
import prisma from "../../prisma"

import styles from "../styles/app.module.scss"
import Application from "../components/Layout"
import { AccountPage } from "../components/Account/AccountPage"
import { WarningMessage } from "../components/Account/WarningMessage"

const account = ({ session, user }) => {
	return (
		<Application session={session} title='Your account'>
			<h1 className={styles.pageTitle}>Your account</h1>
			<div className={styles.accountPage}>
				<WarningMessage accounts={user.accounts} />
				<AccountPage user={user} session={session} />
			</div>
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
	const user = await prisma.user.findUnique({
		where: { name: session.user.name },
		include: {
			accounts: true,
		},
	})

	return { props: { session: session, user: user } }
}

export default account
