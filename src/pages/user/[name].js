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

export default user
