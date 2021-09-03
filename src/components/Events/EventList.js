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
	return (
		<div className={styles.eventList}>
			<h1 className={styles.eventListDate}>
				{monthNames[month - 1]} {selectedDay}, {year}
			</h1>
			<div className={styles.eventListItems}>
				{events.map((event) => {
					return <EventElement key={event.id} event={event} />
				})}
			</div>
		</div>
	)
}

export default EventList
