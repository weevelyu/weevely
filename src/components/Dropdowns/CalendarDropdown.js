import { useState } from "react"
import axios from "axios"

import CalendarModal from "../Modals/CalendarModal"
import styles from "../../styles/app.module.scss"
import { Dots } from "../../lib/icons/Misc"

const CalendarDrowdown = (props) => {
	const [editing, setEditing] = useState(false)
	const [toggle, setToggle] = useState(false)

	const deleteRecord = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: props.accessToken,
			},
			url: `${process.env.API_URL}/api/calendars/${props.calendar.id}`,
		}
		axios.delete(api.url, {
			headers: api.headers,
		})
		props.setCalendars((prevState) =>
			prevState.filter((item) => item.id !== props.calendar.id)
		)
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
					{props.calendar.main || (
						<button
							className={styles.dropdownOption}
							onClick={() => deleteRecord()}
							name='danger'
						>
							Delete
						</button>
					)}
					<CalendarModal
						calendar={props.calendar}
						editing={editing}
						editRecord={editRecord}
						accessToken={props.accessToken}
					/>
				</div>
			)}
		</>
	)
}

export default CalendarDrowdown
