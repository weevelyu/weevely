import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import Modal from "react-modal"

import styles from "../../styles/modals.module.scss"
import { Remove } from "../../lib/icons/Misc"

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

const EventModal = ({
	calendar_id,
	users,
	sharing,
	sharedMenu,
	accessToken,
}) => {
	const [names, setNames] = useState(() => {
		const namesArr = []
		for (let i = 0; i < users.length; i++) namesArr.push(users[i].name)
		return namesArr
	})
	const [newName, setNewName] = useState("")

	const onAdd = () => {
		if (newName.length === 0) return
		if (names.indexOf(newName) !== -1) return
		setNames([...names, newName])
		setNewName("")
	}
	const onRemove = (name) => setNames(names.filter((item) => item !== name))

	const onSubmit = () => {
		axios
			.post(
				`${process.env.API_URL}/calendars/${calendar_id}/share`,
				{
					users: JSON.stringify(names),
				},
				{
					headers: {
						Authorization: accessToken,
					},
				}
			)
			.finally(() => {
				sharedMenu(true)
				location.reload()
			})
	}

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
		>
			<h1>Share calendar</h1>
			<form
				className={styles.sharedModalForm}
				onSubmit={(e) => onSubmit(e.preventDefault())}
			>
				<span className={styles.sharedModalFormHint}>
					Enter user's name or ShareID
				</span>
				<div className={styles.sharedModalFormUser}>
					<input
						type='text'
						name='Add'
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						className={styles.sharedModalFormInput}
					/>
					<input
						type='button'
						value='Add'
						onClick={(e) => onAdd(e.preventDefault())}
						className={styles.sharedModalFormButton}
					/>
				</div>
				{names.map((name) => {
					let image =
						"https://d3djy7pad2souj.cloudfront.net/avatar_p.png"
					for (let i = 0; i < users.length; i++)
						if (users[i].name === name) image = users[i].image
					return (
						<div
							key={names.indexOf(name)}
							className={styles.sharedModalFormUser}
						>
							<div className={styles.sharedModalFormUserAvatar}>
								<Image
									src={image}
									alt='avatarPreview'
									width={34}
									height={34}
									quality={50}
									objectFit='cover'
								/>
							</div>
							<input
								type='text'
								readOnly
								value={name}
								className={styles.sharedModalFormInput}
							/>
							{names.indexOf(name) === 0 ? (
								<button
									name={name}
									disabled
									onClick={(e) =>
										onRemove(e.currentTarget.name)
									}
									className={styles.sharedModalFormButton}
								>
									<Remove />
								</button>
							) : (
								<button
									name={name}
									onClick={(e) =>
										onRemove(e.currentTarget.name)
									}
									className={styles.sharedModalFormButton}
								>
									<Remove />
								</button>
							)}
						</div>
					)
				})}
				<input
					type='submit'
					value='Apply'
					className={styles.sharedModalFormButton}
				/>
			</form>
		</Modal>
	)
}

export default EventModal
