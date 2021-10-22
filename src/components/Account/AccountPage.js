import Image from "next/image"
import { useState } from "react"
import { setCookie } from "nookies"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/router"

import styles from "../../styles/app.module.scss"

export const AccountPage = ({ user }) => {
	const router = useRouter()
	const [name, setName] = useState(user.name)
	const [email, setEmail] = useState(user.email)

	const handleChange = (e) => {
		switch (e.target.id) {
			case "name":
				setName(e.target.value)
				break
			case "email":
				setEmail(e.target.value)
				break
			case "image":
				const formData = new FormData()
				formData.append(
					"image",
					document.querySelector("#image").files[0]
				)

				const api = {
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
						Authorization: user.token,
					},
					data: formData,
					url: `${process.env.API_URL}/users/me/avatar`,
				}
				const promise = axios.post(api.url, api.data, {
					headers: api.headers,
					withCredentials: true,
				})
				toast.promise(promise, {
					loading: "Changing avatar...",
					success: (response) => {
						setCookie(null, "user", response.data.cookie, {
							maxAge: JSON.parse(response.data.cookie).ttl,
							path: "/",
						})
						router.reload()
						return response.data.message
					},
					error: (error) => error,
				})
				break
		}
	}

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			data: {
				name: name,
				email: email,
			},
			url: `${process.env.API_URL}/users/me`,
		}

		if (name === user.name) delete api.data.name
		if (email === user.email) delete api.data.email
		if (Object.keys(api.data).length === 0) {
			toast.error("Nothing to update.")
			return
		}

		const promise = axios.patch(api.url, api.data, {
			headers: api.headers,
			withCredentials: true,
		})

		toast.promise(promise, {
			loading: "Updating you...",
			success: (response) => {
				setCookie(null, "user", response.data.cookie, {
					maxAge: JSON.parse(response.data.cookie).ttl,
					path: "/",
				})
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
					if (error.response.data.errors.name)
						for (
							let i = 0;
							i < error.response.data.errors.name.length;
							i++
						)
							toast.error(error.response.data.errors.name[i])
					if (error.response.data.errors.email)
						for (
							let i = 0;
							i < error.response.data.errors.email.length;
							i++
						)
							toast.error(error.response.data.errors.email[i])
				}
				return error.response.data.message
			},
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
					layout='fixed'
					quality={100}
					objectFit='cover'
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
			<Toaster
				position='bottom-center'
				reverseOrder={false}
				toastOptions={{
					style: {
						borderRadius: "8px",
						backgroundColor: "white",
						padding: "10px",
					},
					duration: 2000,
					success: {
						iconTheme: {
							primary: "#7c6aef",
							secondary: "#FFF",
						},
					},
					error: { duration: 4000 },
				}}
			/>
		</div>
	)
}
