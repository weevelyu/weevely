import Application from "../components/Layout"
import styles from "../styles/app.module.scss"

export default function calendars() {
	return (
		<Application title='Shared calendars'>
			<h1 className={styles.pageTitle}>Shared calendars</h1>
			<div className={styles.calendarList}></div>
		</Application>
	)
}
