import styles from "../../styles/app.module.scss"

const Heading = () => {
	return (
		<div className={styles.dateHeading}>
			<span>Sun</span>
			<span>Mon</span>
			<span>Tue</span>
			<span>Wed</span>
			<span>Thu</span>
			<span>Fri</span>
			<span>Sat</span>
		</div>
	)
}

const DateList = ({ days, events, setSelectedDay }) => {
	const handleClick = (value) => setSelectedDay(value)

	let itemList = []
	for (let i = 1; i < days + 1; i++)
		itemList.push(
			<input
				type='button'
				key={i}
				className={styles.dateElement}
				onClick={(e) => handleClick(+e.target.value)}
				value={i}
				// name={events.}
			/>
		)

	return (
		<div className={styles.dateList}>
			<Heading />
			<div className={styles.dateContent}>{itemList}</div>
		</div>
	)
}

export default DateList
