import Image from "next/image"
import { useState } from "react"
import axios from "axios"

import styles from "../../styles/app.module.scss"

export const AccountPage = ({ user, session }) => {
	const [name, setName] = useState(user.name)

	const handleChange = (e) => {
		switch (e.target.id) {
			case "name":
				setName(e.target.value)
				break
			case "image":
				const formData = new FormData()
				formData.append(
					"image",
					document.querySelector("#image").files[0]
				)
				break
		}
	}

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: session.accessToken,
			},
			data: {
				name: name,
			},
			url: `http://paxanddos.ddns.net:3000/api/users/${user.id}`,
		}
		axios.patch(api.url, api.data, {
			headers: api.headers,
		})
	}

	return (
		<div className={styles.accountPageMain}>
			<form className={styles.accountImageBlock}>
				<Image
					src={user.image}
					alt='avatarPreview'
					width={200}
					height={200}
				/>
				<label htmlFor='image'>Upload an image</label>
				<input
					id='image'
					onChange={(e) => handleChange(e)}
					type='file'
					accept='image/png, image/jpg, image/jpeg, image/gif'
				/>
			</form>
			<form
				onSubmit={(e) => handleSubmit(e.preventDefault())}
				className={styles.accountDataBlock}
			>
				<label htmlFor='username'>Username</label>
				<input
					id='name'
					value={name}
					onChange={(e) => handleChange(e)}
					type='text'
					placeholder='Enter your username'
				/>

				<label htmlFor='email'>Email</label>
				<input
					id='email'
					value={user.email}
					onChange={(e) => handleChange(e)}
					type='email'
					disabled={true}
				/>
				<input type='submit' value='Apply' />
			</form>
		</div>
	)
}
