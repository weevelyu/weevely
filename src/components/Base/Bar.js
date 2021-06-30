import { useRouter } from "next/router"
import Link from "next/link"

import styles from "../../styles/app.module.scss"
import { Logo } from "../../lib/icons/Brand"
import { Calendar, Shared } from "../../lib/icons/Misc"
import AccountDropdown from "../Dropdowns/AccountDropdown"

const Bar = ({ session }) => {
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
					{pathname === "/calendars" ? (
						<button
							className={(styles.active, styles.barOptionsButton)}
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
					{pathname === "/shared" ? (
						<button
							className={(styles.active, styles.barOptionsButton)}
						>
							<Shared />
						</button>
					) : (
						<button className={styles.barOptionsButton}>
							<Shared />
						</button>
					)}
				</Link>
			</div>
			<div className={styles.barAccount}>
				<AccountDropdown session={session} />
			</div>
		</div>
	)
}

export default Bar
