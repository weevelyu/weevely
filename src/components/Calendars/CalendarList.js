import CalendarElement from "./CalendarElement"

const CalendarList = ({ calendars }) => {
	return calendars.map((calendar) => {
		return <CalendarElement key={calendar.id} calendar={calendar} />
	})
}

export default CalendarList
