import Link from "next/link"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Lock, Link as LinkSVG, Party, Time } from "../../lib/icons/Misc"
import CalendarDrowdown from "../Dropdowns/CalendarDropdown"
import styles from "../../styles/app.module.scss"

const CalendarElement = ({ calendar, setCalendars, accessToken }) => {
	dayjs.extend(relativeTime)
	return (
		<div className={styles.calendarElement}>
			<div className={styles.calendarData}>
				<h2 className={styles.calendarTitle}>
					{calendar.title}
					<CalendarDrowdown
						calendar={calendar}
						setCalendars={setCalendars}
						accessToken={accessToken}
					/>
				</h2>
				<span className={styles.calendarSpan}>
					<Party />
					{calendar.events.length} upcoming events
				</span>
				{calendar.shared ? (
					<span className={styles.calendarSpan}>
						<LinkSVG />
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
			<Link href={`/calendars/${calendar.id}`}>
				<button className={styles.calendarOpenButton}>Open</button>
			</Link>
		</div>
	)
}

export default CalendarElement
