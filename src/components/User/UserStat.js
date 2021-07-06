import { Link, Time } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const UserStat = ({ title, content }) => {
	return (
		<div className={styles.userBannerDataStat}>
			<h3 className={styles.userBannerDataStatTitle}>{title}</h3>
			<div>
				{title === "Share ID" && <Link />}
				{title === "Member for" && <Time />}
				<span className={styles.userBannerDataStatContent}>
					{content}
				</span>
			</div>
		</div>
	)
}

export default UserStat
