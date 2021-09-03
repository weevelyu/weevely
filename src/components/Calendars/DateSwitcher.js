import styles from "../../styles/app.module.scss"
import { Arrow } from "../../lib/icons/Misc"

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

const DateSwitcher = ({ month, setMonth, year, setYear }) => {
	const handleChange = (value) => {
		if (month === 12 && value === 1) {
			setMonth(value)
			setYear(year + 1)
		} else if (month === 1 && value === -1) {
			setMonth(12)
			setYear(year - 1)
		} else setMonth(month + value)
	}

	return (
		<div className={styles.dateSwitcher}>
			<span className={styles.dateMonth}>{monthNames[month - 1]}</span>
			<div className={styles.dateButtons}>
				<button
					className={styles.dateSwitch}
					value={-1}
					onClick={(e) => handleChange(+e.currentTarget.value)}
				>
					<Arrow />
				</button>
				<button
					className={styles.dateSwitch}
					value={1}
					onClick={(e) => handleChange(+e.currentTarget.value)}
				>
					<Arrow />
				</button>
			</div>
		</div>
	)
}

export default DateSwitcher
