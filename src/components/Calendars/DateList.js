import styles from "../../styles/app.module.scss"
import { Circle } from "../../lib/icons/Misc"

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

const DateList = ({
	days,
	events,
	month,
	year,
	selectedDay,
	setSelectedDay,
}) => {
	const handleClick = (value) => setSelectedDay(value)
	const today = new Date().getDate()
	const weekday = new Date(1, month, year).getDay()
	let itemList = []
	for (let skip = 1; skip < weekday; skip++) {
		itemList.push(
			<div className={styles.dateSkipped} key={skip + "s"} id={skip}>
				<input
					type='button'
					className={styles.dateElementNumber}
					name='skip'
				/>
			</div>
		)
	}
	for (let i = 1; i < days + 1; i++) {
		let dot = false
		for (let j = 0; j < events.length; j++) {
			const eD = new Date(events[j].target)
			if (
				new Date(
					eD.getFullYear(),
					eD.getMonth(),
					eD.getDate()
				).getTime() === new Date(year, month, i).getTime()
			) {
				itemList.push(
					<div
						className={styles.dateElement}
						key={i}
						onClick={(e) => handleClick(+e.currentTarget.id)}
						id={i}
						label={today == i ? "today" : "hello"}
						name={selectedDay == i ? "selected" : "hello"}
					>
						<input
							type='button'
							className={styles.dateElementNumber}
							value={i}
						/>
						<Circle fill='#6775ee' />
					</div>
				)
				dot = true
				break
			}
		}
		if (!dot)
			itemList.push(
				<div
					className={styles.dateElement}
					key={i}
					onClick={(e) => handleClick(+e.currentTarget.id)}
					id={i}
					label={today == i ? "today" : "hello"}
					name={selectedDay == i ? "selected" : "hello"}
				>
					<input
						type='button'
						className={styles.dateElementNumber}
						value={i}
					/>
				</div>
			)
	}

	return (
		<div className={styles.dateList}>
			<Heading />
			<div className={styles.dateContent}>{itemList}</div>
		</div>
	)
}

export default DateList
