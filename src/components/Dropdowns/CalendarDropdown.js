import { useState } from "react"
import axios from "axios"

import CalendarModal from "../Modals/CalendarModal"
import SharingModal from "../Modals/SharingModal"
import styles from "../../styles/app.module.scss"
import { Dots } from "../../lib/icons/Misc"

const CalendarDrowdown = (props) => {
	const [editing, setEditing] = useState(false)
	const [sharing, setSharing] = useState(false)
	const [toggle, setToggle] = useState(false)

	const deleteRecord = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: props.accessToken,
			},
			url: `${process.env.API_URL}/calendars/${props.calendar.id}`,
		}
		axios
			.delete(api.url, {
				headers: api.headers,
			})
			.finally(() => {
				props.setCalendars((prevState) =>
					prevState.filter((item) => item.id !== props.calendar.id)
				)
			})
	}

	const editRecord = (fin) => {
		setEditing(!editing)
		fin && setToggle(!toggle)
	}

	const sharedMenu = (fin) => {
		setSharing(!sharing)
		fin && setToggle(!toggle)
	}

	const hideCalendar = () => {
		axios
			.post(
				`${process.env.API_URL}/calendars/${props.calendar.id}/hide`,
				null,
				{ headers: { Authorization: props.accessToken } }
			)
			.finally(() => {
				props.setCalendars((prevState) =>
					prevState.filter((item) => item.id !== props.calendar.id)
				)
			})
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
							onClick={() => sharedMenu()}
						>
							Share
						</button>
					)}
					{props.calendar.main || (
						<button
							className={styles.dropdownOption}
							onClick={() => hideCalendar()}
						>
							Hide
						</button>
					)}
					{props.calendar.main || (
						<button
							className={styles.dropdownOption}
							onClick={() => deleteRecord()}
							name='danger'
						>
							Delete
						</button>
					)}
					{editing && (
						<CalendarModal
							calendar={props.calendar}
							editing={editing}
							editRecord={editRecord}
							accessToken={props.accessToken}
						/>
					)}
					{sharing && (
						<SharingModal
							calendar_id={props.calendar.id}
							users={props.calendar.users}
							sharing={sharing}
							sharedMenu={sharedMenu}
							accessToken={props.accessToken}
						/>
					)}
				</div>
			)}
		</>
	)
}

export default CalendarDrowdown
