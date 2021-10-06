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
	try {
		const user = JSON.parse(nookies.get(ctx).user)
		return { props: { user: user } }
	} catch (e) {
		ctx.res.writeHead(303, { Location: "/signin" })
		ctx.res.end()
	}
}

export default account
