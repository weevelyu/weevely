import axios from "axios"
import { PlusCircle } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const EventCreate = ({
	calendarId,
	setEvents,
	accessToken,
	year,
	month,
	day,
}) => {
	const createEvent = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: accessToken,
			},
			data: {
				target: `${year}-${month}-${day}`,
			},
			url: `${process.env.API_URL}/calendars/${calendarId}/events`,
		}
		axios.post(api.url, api.data, { headers: api.headers }).then((res) => {
			setEvents((prevState) => [
				...prevState,
				Object.assign(res.data, {
					title: "New event",
					category: "Reminder",
				}),
			])
		})
	}

	return (
		<div className={styles.eventListAdd} onClick={() => createEvent()}>
			<PlusCircle />
			<span className={styles.eventListAddText}>Create event</span>
		</div>
	)
}

export default EventCreate
