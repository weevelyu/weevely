import axios from "axios"
import { Plus } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const NewCalendar = ({ setCalendars, accessToken }) => {
	const addCalendar = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: accessToken,
			},
			data: {},
			url: `http://paxanddos.ddns.net:8000/api/calendars/my`,
		}
		axios
			.post(api.url, api.data, {
				headers: api.headers,
			})
			.then((response) => {
				setCalendars((prevState) => [
					...prevState,
					Object.assign(response.data.calendar, {
						events: { length: 0 },
					}),
				])
			})
	}
	return (
		<div className={styles.calendarCreateBlock}>
			<button onClick={() => addCalendar()}>
				<Plus />
			</button>
		</div>
	)
}

export default NewCalendar
