import CalendarElement from "./CalendarElement"

const CalendarList = ({ calendars, setCalendars }) => {
	return calendars.map((calendar) => {
		return (
			<CalendarElement
				key={calendar.id}
				calendar={calendar}
				setCalendars={setCalendars}
			/>
		)
	})
}

export default CalendarList
