import axios from "axios"
import { useState } from "react"
import Modal from "react-modal"

const style = {
	content: {
		position: "absolute",
		top: "19%",
		left: "37%",
		width: "500px",
		height: "fit-content",
		borderRadius: "14px",
		borderColor: "#b8bef3",
		padding: 20,
	},
	form: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
	},
	input: {
		width: "100%",
		height: 40,
		fontSize: 24,
		border: "1px solid #ccd1f5",
		borderRadius: 8,
		padding: "0 8px",
	},
	textarea: {
		resize: "vertical",
		width: "100%",
		height: 200,
		marginTop: 20,
		fontSize: 18,
		border: "1px solid #ccd1f5",
		borderRadius: 8,
		padding: "8px",
	},
	select: {
		width: "fit-content",
		margin: "14px 0",
		fontSize: 15,
		border: "1px solid #ccd1f5",
		borderRadius: 4,
		padding: 4,
	},
	datetimebox: {
		width: "100%",
		height: 30,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	date: {
		width: "fit-content",
		height: "100%",
		fontSize: 20,
		border: "1px solid #ccd1f5",
		borderRadius: 4,
		padding: 2,
		letterSpacing: 0.6,
		marginRight: 30,
		textAlign: "center",
	},
	time: {
		width: "fit-content",
		height: "100%",
		fontSize: 20,
		border: "1px solid #ccd1f5",
		borderRadius: 4,
		padding: 4,
		letterSpacing: 0.7,
		textAlign: "center",
	},
	thebox: {
		height: 40,
		display: "flex",
		flexDirection: "row",
		marginTop: 20,
	},
	apply: {
		width: 80,
		height: "100%",
		background: "#6775ee",
		color: "white",
		fontSize: 16,
		borderRadius: 8,
		cursor: "pointer",
	},
	delete: {
		width: "fit-content",
		height: "100%",
		padding: "0 8px",
		marginLeft: 16,
		background: "rgba(0, 0, 0, 0)",
		color: "rgba(255, 0, 0, 0.7)",
		border: "1px solid rgba(255, 0, 0, 0.7)",
		fontSize: 16,
		borderRadius: 8,
		cursor: "pointer",
	},
}

const EventModal = ({
	event,
	setEventState,
	modal,
	setModal,
	accessToken,
	setEvents,
}) => {
	const [title, setTitle] = useState(event.title)
	const [content, setContent] = useState(event.content || "")
	const [category, setCategory] = useState(event.category)
	const [date, setDate] = useState(
		`${event.target.getFullYear()}-${
			event.target.getMonth() + 1
		}-${event.target.getDate()}`
	)
	const [time, setTime] = useState(
		`${
			(event.target.getHours() < 10 ? "0" : "") + event.target.getHours()
		}:${
			(event.target.getMinutes() < 10 ? "0" : "") +
			event.target.getMinutes()
		}`
	)

	const handleChange = (target) => {
		switch (target.name) {
			case "title":
				setTitle(target.value)
				break
			case "content":
				setContent(target.value)
				break
			case "category":
				setCategory(target.value)
				break
			case "date":
				setDate(target.value)
				break
			case "time":
				setTime(target.value)
				break
		}
	}

	const handleReset = () => {
		axios
			.delete(
				`${process.env.API_URL}/calendars/${event.calendar_id}/events/${event.id}`,
				{
					headers: {
						Authorization: accessToken,
					},
				}
			)
			.finally(() => {
				setEvents((prevState) =>
					prevState.filter((item) => item.id !== event.id)
				)
				setModal(false)
			})
	}

	const handleSumbit = () => {
		const dt = new Date(`${date} ${time}:00`)
		const offset = dt.getTimezoneOffset() * 60 * 1000
		const utcTime = new Date(dt.setTime(dt.getTime() + offset))
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: accessToken,
			},
			data: {
				title,
				content,
				category,
				target: `${utcTime.getFullYear()}-${
					utcTime.getMonth() + 1
				}-${utcTime.getDate()} ${
					(utcTime.getHours() < 10 ? "0" : "") + utcTime.getHours()
				}:${
					(utcTime.getMinutes() < 10 ? "0" : "") +
					utcTime.getMinutes()
				}:00`,
			},
			url: `${process.env.API_URL}/calendars/${event.calendar_id}/events/${event.id}`,
		}

		axios
			.patch(api.url, api.data, {
				headers: api.headers,
			})
			.then((res) => {
				res.data.target = new Date(res.data.target)
				setEventState(res.data)
				setModal(false)
			})
	}

	return (
		<Modal
			isOpen={modal}
			contentLabel='Event modal'
			style={style}
			ariaHideApp={false}
			onRequestClose={(e) => {
				e.stopPropagation()
				setModal(false)
			}}
			shouldCloseOnOverlayClick={true}
		>
			<form
				onSubmit={(e) => handleSumbit(e.preventDefault())}
				onReset={(e) => handleReset(e.preventDefault())}
				style={style.form}
			>
				<input
					type='text'
					value={title}
					style={style.input}
					name='title'
					onChange={(e) => handleChange(e.target)}
				/>
				<textarea
					type='text'
					value={content}
					style={style.textarea}
					placeholder={"Add some description ..."}
					name='content'
					onChange={(e) => handleChange(e.target)}
				/>
				<select
					value={category}
					name='category'
					style={style.select}
					onChange={(e) => handleChange(e.target)}
				>
					<option>Arrangement</option>
					<option>Reminder</option>
					<option>Task</option>
				</select>
				<div style={style.datetimebox}>
					<input
						type='date'
						style={style.date}
						value={date}
						min={`${event.target.getFullYear()}-${
							event.target.getMonth() + 1
						}-${event.target.getDate()}`}
						max='9999-12-31'
						name='date'
						onChange={(e) => handleChange(e.target)}
					/>
					<input
						type='time'
						style={style.time}
						value={time}
						name='time'
						onChange={(e) => handleChange(e.target)}
					/>
				</div>
				<div style={style.thebox}>
					<input type='submit' value='Apply' style={style.apply} />
					<input
						type='reset'
						value='Delete event'
						style={style.delete}
					/>
				</div>
			</form>
		</Modal>
	)
}

export default EventModal
