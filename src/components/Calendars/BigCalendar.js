import { useState, useEffect } from "react"

import styles from "../../styles/app.module.scss"
import EventList from "../Events/EventList"
import DateSwitcher from "./DateSwitcher"
import DateList from "./DateList"

const BigCalendar = ({ calendar, accessToken }) => {
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
					month={month - 1}
					year={year}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
				/>
			</div>
			<EventList
				calendar={calendar}
				selectedDay={selectedDay}
				month={month - 1}
				year={year}
				accessToken={accessToken}
			/>
		</>
	)
}

export default BigCalendar
