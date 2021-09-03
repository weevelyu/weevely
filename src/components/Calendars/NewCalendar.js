import axios from "axios"
import { useSession } from "next-auth/client"
import { Plus } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const NewCalendar = ({ setCalendars }) => {
	const [session, loading] = useSession()

	const addCalendar = () => {
		if (!loading) {
			const api = {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: session.accessToken,
				},
				data: {},
				url: `http://paxanddos.ddns.net:3000/api/calendars`,
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
