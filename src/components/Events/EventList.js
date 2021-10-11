import { useState } from "react"
import EventElement from "./EventElement"
import EventCreate from "./EventCreate"
import styles from "../../styles/app.module.scss"

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

const EventList = ({ calendar, selectedDay, month, year, accessToken }) => {
	const [events, setEvents] = useState(calendar.events)

	let selectedEvents = []
	for (let i = 0; i < events.length; i++) {
		const eD = new Date(events[i].target)
		if (
			new Date(
				eD.getFullYear(),
				eD.getMonth(),
				eD.getDate()
			).getTime() === new Date(year, month, selectedDay).getTime()
		)
			selectedEvents.push(events[i])
	}

	return (
		<div className={styles.eventList}>
			<h1 className={styles.eventListDate}>
				{monthNames[month]} {selectedDay}, {year}
			</h1>
			<div className={styles.eventListItems}>
				{selectedEvents.map((event) => {
					event.target = new Date(event.target)
					return (
						<EventElement
							key={event.id}
							event={event}
							accessToken={accessToken}
							setEvents={setEvents}
						/>
					)
				})}
				<EventCreate
					calendarId={calendar.id}
					setEvents={setEvents}
					accessToken={accessToken}
					year={year}
					month={month + 1}
					day={selectedDay}
				/>
			</div>
		</div>
	)
}

export default EventList
