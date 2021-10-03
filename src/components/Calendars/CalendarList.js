import CalendarElement from "./CalendarElement"

const CalendarList = ({ calendars, setCalendars, accessToken }) => {
	return calendars.map((calendar) => {
		return (
			<CalendarElement
				key={calendar.id}
				calendar={calendar}
				setCalendars={setCalendars}
				accessToken={accessToken}
			/>
		)
	})
}

export default CalendarList
