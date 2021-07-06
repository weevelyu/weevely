import Link from "next/link"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import UserStat from "../../components/User/UserStat"
import UserAccounts from "./UserAccounts"
import styles from "../../styles/app.module.scss"

const UserBanner = ({ user, owner }) => {
	dayjs.extend(relativeTime)

	return (
		<div className={styles.userBanner}>
			<div className={styles.userBannerImageBlock}>
				<img className={styles.userBannerImage} src={user.image} />
			</div>
			<div className={styles.userBannerDataBlock}>
				<h2 className={styles.userBannerDataName}>
					{user.name}
					<UserAccounts accounts={user.accounts} />
				</h2>
				{user.sessions.length !== 0 ? (
					<span className={styles.userBannerDataStatus} id='online'>
						Online
					</span>
				) : (
					<span className={styles.userBannerDataStatus} id='offline'>
						Offline
					</span>
				)}
				<UserStat title='Share ID' content='qweW' />
				<UserStat
					title='Member for'
					content={dayjs(user.createdAt).fromNow(true)}
				/>
				{owner && (
					<Link href='/account'>
						<a className={styles.userBannerOwnerButton}>
							Account settings
						</a>
					</Link>
				)}
			</div>
		</div>
	)
}

export default UserBanner
