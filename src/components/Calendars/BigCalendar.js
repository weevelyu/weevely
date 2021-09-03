import { useState, useEffect } from "react"

import styles from "../../styles/app.module.scss"
import EventList from "../Events/EventList"
import DateSwitcher from "./DateSwitcher"
import DateList from "./DateList"

const BigCalendar = ({ calendar }) => {
	const dt = new Date()
	const [month, setMonth] = useState(dt.getMonth() + 1)
	const [year, setYear] = useState(dt.getFullYear())
	const [days, setDays] = useState(new Date(year, month, 0).getDate())
	const [selectedDay, setSelectedDay] = useState(dt.getDate())

	useEffect(() => {
		setDays(new Date(year, month, 0).getDate())
	}, [month, year])

	return (
		<>
			<div className={styles.bigCalendar}>
				<DateSwitcher
					month={month}
					setMonth={setMonth}
					year={year}
					setYear={setYear}
				/>
				<DateList
					days={days}
					events={calendar.events}
					setSelectedDay={setSelectedDay}
				/>
			</div>
			<EventList
				events={calendar.events}
				selectedDay={selectedDay}
				month={month}
				year={year}
			/>
		</>
	)
}

export default BigCalendar
