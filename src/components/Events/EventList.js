import EventElement from "./EventElement"
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

const EventList = ({ events, selectedDay, month, year }) => {
	let selectedEvents = []
	for (let i = 0; i < events.length; i++) {
		const eD = new Date(events[i].target)
		if (
			new Date(
				eD.getFullYear(),
				eD.getMonth(),
				eD.getDate()
			).getTime() === new Date(year, month, selectedDay).getTime()
		) {
			selectedEvents.push(events[i])
		}
	}

	return (
		<div className={styles.eventList}>
			<h1 className={styles.eventListDate}>
				{monthNames[month]} {selectedDay}, {year}
			</h1>
			<div className={styles.eventListItems}>
				{selectedEvents.map((event) => {
					return <EventElement key={event.id} event={event} />
				})}
			</div>
		</div>
	)
}

export default EventList
