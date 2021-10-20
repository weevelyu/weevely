import nookies from "nookies"
import styles from "../styles/app.module.scss"
import Application from "../components/Layout"
import { AccountPage } from "../components/Account/AccountPage"

const account = ({ user }) => {
	return (
		<Application user={user} title='Your account'>
			<h1 className={styles.pageTitle}>Your account</h1>
			<div className={styles.accountPage}>
				<AccountPage user={user} />
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
	return { props: { user: user } }
}

export default account
