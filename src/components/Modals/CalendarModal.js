import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Modal from "react-modal"
import style from "../../styles/modals.module.scss"

const CalendarModal = ({ calendar, editing, editRecord, accessToken }) => {
	const router = useRouter()
	const [title, setTitle] = useState(calendar.title)

	const applyChanges = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: accessToken,
			},
			data: {
				title: title,
			},
			url: `${process.env.API_URL}/calendars/${calendar.id}`,
		}
		axios
			.patch(api.url, api.data, {
				headers: api.headers,
			})
			.finally(() => {
				editRecord(true)
				router.reload()
			})
	}

	return (
		<Modal
			isOpen={editing}
			contentLabel='Calendar Modal'
			className={style.calendarModal}
			ariaHideApp={false}
			onRequestClose={(e) => {
				e.stopPropagation()
				editRecord(true)
			}}
			shouldCloseOnOverlayClick={true}
		>
			<form className={style.calendarModalForm}>
				<label
					htmlFor='calendarTitle'
					className={style.calendarModalLabel}
				>
					Calendar Title
					<input
						className={style.calendarModalInput}
						id='calendarTitle'
						placeholder='Calendar title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<button
					className={style.calendarModalApply}
					type='submit'
					onClick={(e) => applyChanges(e.preventDefault())}
				>
					Apply
				</button>
			</form>
		</Modal>
	)
}

export default CalendarModal
