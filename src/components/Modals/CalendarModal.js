import axios from "axios"
import { useSession } from "next-auth/client"
import { useState } from "react"
import { useRouter } from "next/router"
import Modal from "react-modal"
import { Close } from "../../lib/icons/Misc"

const style = {
	content: {
		position: "absolute",
		top: "19%",
		left: "37%",
		width: "500px",
		height: "fit-content",
		borderRadius: "18px",
		borderColor: "#b8bef3",
	},
	form: {
		width: "100%",
		marginTop: "20px",
	},
	label: {
		display: "flex",
		flexDirection: "column",
		fontSize: 14,
	},
	input: {
		width: "100%",
		height: 40,
		marginTop: 6,
		background: "#e0e3f6",
		fontSize: 16,
		padding: "0 6px",
		borderRadius: "8px",
		border: "1px solid #b8bef3",
	},
	apply: {
		width: 80,
		height: 40,
		background: "#6775ee",
		color: "white",
		fontSize: 16,
		borderRadius: 10,
		marginTop: 40,
	},
}

const CalendarModal = ({ calendar, editing, editRecord, setCalendars }) => {
	const [session, loading] = useSession()
	const router = useRouter()
	const [title, setTitle] = useState(calendar.title)

	const applyChanges = () => {
		if (loading) return

		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: session.accessToken,
			},
			data: {
				title: title,
			},
			url: `http://localhost:3000/api/calendars/${calendar.id}`,
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

	const handleChange = (target) => {
		setTitle(target.value)
	}

	return (
		<Modal
			isOpen={editing}
			contentLabel='Example Modal'
			style={style}
			ariaHideApp={false}
		>
			<button onClick={() => editRecord(true)}>
				<Close width={18} fill='rgba(0, 0, 0, 0.7)' />
			</button>
			<form style={style.form}>
				<label htmlFor='calendarTitle' style={style.label}>
					Calendar Title
					<input
						style={style.input}
						id='calendarTitle'
						placeholder='Calendar title'
						value={title}
						onChange={(e) => handleChange(e.target)}
					/>
				</label>
				<button
					style={style.apply}
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
