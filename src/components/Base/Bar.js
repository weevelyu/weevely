import { useRouter } from "next/router"
import Link from "next/link"

import styles from "../../styles/app.module.scss"
import { Logo } from "../../lib/icons/Brand"
import { Calendar, Hidden, Shared } from "../../lib/icons/Misc"
import AccountDropdown from "../Dropdowns/AccountDropdown"

const Bar = ({ user }) => {
	const { pathname } = useRouter()
	return (
		<div className={styles.bar}>
			<div className={styles.barOptions}>
				<Link href='/calendars'>
					<button className={styles.barOptionsButton}>
						<Logo />
					</button>
				</Link>
				<Link href='/calendars'>
					{pathname.match(/^\/calendars/) ? (
						<button
							className={`${styles.barOptionsButton} ${styles.barOptionsButtonActive}`}
						>
							<Calendar />
						</button>
					) : (
						<button className={styles.barOptionsButton}>
							<Calendar />
						</button>
					)}
				</Link>
				<Link href='/shared'>
					{pathname.match(/^\/shared/) ? (
						<button
							className={`${styles.barOptionsButton} ${styles.barOptionsButtonActive}`}
						>
							<Shared />
						</button>
					) : (
						<button className={styles.barOptionsButton}>
							<Shared />
						</button>
					)}
				</Link>
				<Link href='/hidden'>
					{pathname.match(/^\/hidden/) ? (
						<button
							className={`${styles.barOptionsButton} ${styles.barOptionsButtonActive}`}
						>
							<Hidden />
						</button>
					) : (
						<button className={styles.barOptionsButton}>
							<Hidden />
						</button>
					)}
				</Link>
			</div>
			<div className={styles.barAccount}>
				<AccountDropdown user={user} />
			</div>
		</div>
	)
}

export default Bar
