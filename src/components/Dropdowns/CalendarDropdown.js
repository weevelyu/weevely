import { useState } from "react"
import { useSession } from "next-auth/client"
import axios from "axios"

import CalendarModal from "../Modals/CalendarModal"
import styles from "../../styles/app.module.scss"
import { Dots } from "../../lib/icons/Misc"

const CalendarDrowdown = (calendar) => {
	const [editing, setEditing] = useState(false)
	const [toggle, setToggle] = useState(false)
	const [session, loading] = useSession()

	const deleteRecord = () => {
		if (loading) return
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: session.accessToken,
			},
			url: `http://localhost:3000/api/calendars/${calendar.calendar.id}`,
		}
		axios.delete(api.url, {
			headers: api.headers,
		})
	}

	const editRecord = (fin) => {
		setEditing(!editing)
		fin && setToggle(!toggle)
	}

	return (
		<>
			<button
				className={styles.calendarButtonMore}
				onClick={() => setToggle(!toggle)}
			>
				<Dots />
			</button>
			{toggle && (
				<div className={styles.dropdownOptions}>
					<button
						className={styles.dropdownOption}
						onClick={() => editRecord()}
					>
						Edit
					</button>
					{calendar.calendar.main || (
						<button
							className={styles.dropdownOption}
							onClick={() => deleteRecord()}
							name='danger'
						>
							Delete
						</button>
					)}
					<CalendarModal
						calendar={calendar}
						editing={editing}
						editRecord={editRecord}
					/>
				</div>
			)}
		</>
	)
}

export default CalendarDrowdown
