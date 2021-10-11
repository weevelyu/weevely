import { useState } from "react"
import EventModal from "../Modals/EventModal"
import { Arrow } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const EventElement = ({ event, accessToken, setEvents }) => {
	const [eventState, setEventState] = useState(event)
	const [modal, setModal] = useState(false)

	return (
		<div className={styles.eventElement} onClick={() => setModal(true)}>
			<div className={styles.eventElementWrapper}>
				<span className={styles.eventElementTarget}>
					{(eventState.target.getHours() < 10 ? "0" : "") +
						eventState.target.getHours()}
					:
					{(eventState.target.getMinutes() < 10 ? "0" : "") +
						eventState.target.getMinutes()}
				</span>
				<div className={styles.eventElementData}>
					<span className={styles.eventElementCategory}>
						{eventState.category}
					</span>
					<span className={styles.eventElementTitle}>
						{eventState.title}
					</span>
				</div>
			</div>
			<div className={styles.eventElementArrow}>
				<Arrow />
			</div>
			{modal && (
				<EventModal
					event={eventState}
					setEventState={setEventState}
					modal={modal}
					setModal={setModal}
					accessToken={accessToken}
					setEvents={setEvents}
				/>
			)}
		</div>
	)
}

export default EventElement
