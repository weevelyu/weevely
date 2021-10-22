import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "react-modal"
import style from "../../styles/modals.module.scss"
import { Remove } from "../../lib/icons/Misc"

const EventModal = ({
	calendar_id,
	users,
	sharing,
	sharedMenu,
	accessToken,
}) => {
	const router = useRouter()
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
				router.reload()
			})
	}

	return (
		<Modal
			isOpen={sharing}
			contentLabel='Sharing calendar'
			className={style.sharedModal}
			ariaHideApp={false}
			onRequestClose={(e) => {
				e.stopPropagation()
				sharedMenu(true)
			}}
			shouldCloseOnOverlayClick={true}
		>
			<h1>Share calendar</h1>
			<form
				className={style.sharedModalForm}
				onSubmit={(e) => onSubmit(e.preventDefault())}
			>
				<span className={style.sharedModalFormHint}>
					Enter user&apos;s name or ShareID
				</span>
				<div className={style.sharedModalFormUser}>
					<input
						type='text'
						name='Add'
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						className={style.sharedModalFormInput}
					/>
					<input
						type='button'
						value='Add'
						onClick={(e) => onAdd(e.preventDefault())}
						className={style.sharedModalFormButton}
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
							className={style.sharedModalFormUser}
						>
							<div className={style.sharedModalFormUserAvatar}>
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
								className={style.sharedModalFormInput}
							/>
							{names.indexOf(name) === 0 ? (
								<button
									name={name}
									disabled
									onClick={(e) =>
										onRemove(e.currentTarget.name)
									}
									className={style.sharedModalFormButton}
								>
									<Remove />
								</button>
							) : (
								<button
									name={name}
									onClick={(e) =>
										onRemove(e.currentTarget.name)
									}
									className={style.sharedModalFormButton}
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
					className={style.sharedModalFormButton}
				/>
			</form>
		</Modal>
	)
}

export default EventModal
