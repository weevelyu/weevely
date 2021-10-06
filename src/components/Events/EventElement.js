import Link from "next/link"

import { Arrow } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const EventElement = ({ event }) => {
	event.target = new Date(event.target)
	console.log(event)
	return (
		<Link href={`/calendars/${event.calendarId}/${event.id}`}>
			<div className={styles.eventElement}>
				<div className={styles.eventElementWrapper}>
					<span className={styles.eventElementTarget}>
						{(event.target.getHours() < 10 ? "0" : "") +
							event.target.getHours()}
						:
						{(event.target.getMinutes() < 10 ? "0" : "") +
							event.target.getMinutes()}
					</span>
					<div className={styles.eventElementData}>
						<span className={styles.eventElementCategory}>
							{event.category}
						</span>
						<span className={styles.eventElementTitle}>
							{event.title}
						</span>
					</div>
				</div>
				<div className={styles.eventElementArrow}>
					<Arrow />
				</div>
			</div>
		</Link>
	)
}

export default EventElement
