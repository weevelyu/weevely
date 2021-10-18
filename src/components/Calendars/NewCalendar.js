import axios from "axios"
import { Plus } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const NewCalendar = ({ setCalendars, user }) => {
	const addCalendar = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			data: {},
			url: `${process.env.API_URL}/calendars/my`,
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
						users: [user],
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
