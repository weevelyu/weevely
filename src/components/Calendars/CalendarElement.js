import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Lock, Link, Party, Time } from "../../lib/icons/Misc"
import CalendarDrowdown from "../Dropdowns/CalendarDropdown"
import styles from "../../styles/app.module.scss"

const CalendarElement = ({ calendar }) => {
	dayjs.extend(relativeTime)
	return (
		<div className={styles.calendarElement}>
			<div className={styles.calendarData}>
				<h2 className={styles.calendarTitle}>
					{calendar.title}
					<CalendarDrowdown calendar={calendar} />
				</h2>
				<span className={styles.calendarSpan}>
					<Party />
					{calendar.events} upcoming events
				</span>
				{calendar.shared ? (
					<span className={styles.calendarSpan}>
						<Link />
						Public
					</span>
				) : (
					<span className={styles.calendarSpan}>
						<Lock />
						Private
					</span>
				)}
				<span className={styles.calendarSpan}>
					<Time />
					Created {dayjs(calendar.createdAt).fromNow()}
				</span>
			</div>
			<button className={styles.calendarOpenButton}>Open</button>
		</div>
	)
}

export default CalendarElement
