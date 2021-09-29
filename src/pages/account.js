import styles from "../styles/app.module.scss"
import Application from "../components/Layout"
import { AccountPage } from "../components/Account/AccountPage"

const account = () => {
	return (
		<Application title='Your account'>
			<h1 className={styles.pageTitle}>Your account</h1>
			<div className={styles.accountPage}>
				<AccountPage />
			</div>
		</Application>
	)
}

export default account
