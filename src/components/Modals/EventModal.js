import axios from "axios"
import { useState } from "react"
import Modal from "react-modal"
import style from "../../styles/modals.module.scss"

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
			className={style.eventModal}
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
				className={style.eventModalForm}
			>
				<input
					type='text'
					value={title}
					className={style.eventModalInput}
					name='title'
					onChange={(e) => handleChange(e.target)}
				/>
				<textarea
					type='text'
					value={content}
					className={style.eventModalTextarea}
					placeholder={"Add some description ..."}
					name='content'
					onChange={(e) => handleChange(e.target)}
				/>
				<select
					value={category}
					name='category'
					className={style.eventModalSelect}
					onChange={(e) => handleChange(e.target)}
				>
					<option>Arrangement</option>
					<option>Reminder</option>
					<option>Task</option>
				</select>
				<div className={style.eventModalDateTimeBox}>
					<input
						type='date'
						className={style.eventModalDate}
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
						className={style.eventModalTime}
						value={time}
						name='time'
						onChange={(e) => handleChange(e.target)}
					/>
				</div>
				<div className={style.eventModalBox}>
					<input
						type='submit'
						value='Apply'
						className={style.eventModalApply}
					/>
					<input
						type='reset'
						value='Delete event'
						className={style.eventModalDelete}
					/>
				</div>
			</form>
		</Modal>
	)
}

export default EventModal
