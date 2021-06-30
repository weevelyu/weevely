import axios from "axios"
import { useSession } from "next-auth/client"
import { Plus } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const NewCalendar = ({ calendars }) => {
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
				url: `http://localhost:3000/api/calendars`,
			}
			console.log(api)
			const response = axios.post(api.url, api.data, {
				headers: api.headers,
			})
			calendars.push(response)
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
