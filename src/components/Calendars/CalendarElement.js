import Link from "next/link"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import relativeTime from "dayjs/plugin/relativeTime"

import { Lock, Link as LinkSVG, Party, Time } from "../../lib/icons/Misc"
import CalendarDrowdown from "../Dropdowns/CalendarDropdown"
import styles from "../../styles/app.module.scss"

const CalendarElement = ({ calendar, setCalendars, accessToken }) => {
	dayjs.extend(relativeTime)
	const { pathname } = useRouter()
	let upcoming = 0
	let holiday = 0
	for (let i = 0; i < calendar.events.length; i++)
		if (!calendar.events[i].system) upcoming++
		else holiday++

	return (
		<div className={styles.calendarElement}>
			<div className={styles.calendarData}>
				<h2 className={styles.calendarTitle}>
					{calendar.title}
					{pathname.match(/^\/shared/) ? null : (
						<CalendarDrowdown
							calendar={calendar}
							setCalendars={setCalendars}
							accessToken={accessToken}
						/>
					)}
				</h2>
				<span className={styles.calendarSpan}>
					<Party />
					{upcoming} events
				</span>
				{calendar.main && (
					<span className={styles.calendarSpan}>
						<Party />
						{holiday} holidays
					</span>
				)}
				{calendar.shared ? (
					<span className={styles.calendarSpan}>
						<LinkSVG />
						Shared
					</span>
				) : (
					<span className={styles.calendarSpan}>
						<Lock />
						Private
					</span>
				)}
				<span className={styles.calendarSpan}>
					<Time />
					Created {dayjs(calendar.created_at).fromNow()}
				</span>
			</div>
			<Link href={`/calendars/${calendar.id}`}>
				<button className={styles.calendarOpenButton}>Open</button>
			</Link>
		</div>
	)
}

export default CalendarElement
