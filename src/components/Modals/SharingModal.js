import axios from "axios"
import { useState } from "react"
import Modal from "react-modal"

const style = {
	content: {
		position: "absolute",
		top: "19%",
		left: "37%",
		width: "500px",
		height: "fit-content",
		borderRadius: "14px",
		borderColor: "#b8bef3",
		padding: 20,
	},
}

const EventModal = ({ calendar, sharing, sharedMenu, accessToken }) => {
	return (
		<Modal
			isOpen={sharing}
			contentLabel='Sharing calendar'
			style={style}
			ariaHideApp={false}
			onRequestClose={(e) => {
				e.stopPropagation()
				sharedMenu(true)
			}}
			shouldCloseOnOverlayClick={true}
		></Modal>
	)
}

export default EventModal
