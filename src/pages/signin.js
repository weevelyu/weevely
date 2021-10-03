import { useState } from "react"
import nookies, { setCookie } from "nookies"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import Head from "next/head"
import Link from "next/link"

import Header from "../components/Base"
import { Booking } from "../lib/icons/Undraw"
import sass from "../styles/login.module.sass"

const signin = () => {
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")

	const handleChange = (e) => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break
			case "password":
				setPassword(e.target.value)
				break
		}
	}

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				name: name,
				password: password,
			},
			url: "http://paxanddos.ddns.net:8000/api/auth/signin",
		}
		const promise = axios.post(api.url, api.data, { headers: api.headers })
		toast.promise(promise, {
			loading: "Logging in...",
			success: (response) => {
				const user = {
					id: response.data.user.id,
					name: response.data.user.name,
					email: response.data.user.email,
					image: response.data.user.image,
					token: response.data.token,
					expires_in: response.data.expires_in,
				}
				setCookie(null, "user", JSON.stringify(user), {
					maxAge: user.expires_in,
					path: "/",
				})
				location.replace("/calendars")
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
					if (error.response.data.errors.password)
						for (
							let i = 0;
							i < error.response.data.errors.password.length;
							i++
						)
							toast.error(error.response.data.errors.password[i])
				}
				return error.response.data.message
			},
		})
	}

	return (
		<>
			<Head>
				<title>Sign in &#8739; Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div>
				<Header />
				<div className={sass.login}>
					<div className={sass.fields}>
						<h1>Welcome to Weevely!</h1>
						<span>
							Log in to gain access to all features of the
							application, create and manage events and connect to
							others. See our{" "}
							<Link href='/privacy-policy'>
								<a>Privacy Policy</a>
							</Link>
							.
						</span>
						<form
							onSubmit={(e) => handleSubmit(e.preventDefault())}
						>
							<label>
								Your name
								<input
									type='name'
									id='name'
									name='name'
									value={name}
									onChange={handleChange}
									required
								/>
							</label>
							<label>
								Your password
								<input
									type='password'
									id='password'
									name='password'
									value={password}
									onChange={handleChange}
									required
								/>
							</label>
							<button type='submit'>Sign in</button>
						</form>
						<span>
							Not a member yet?{" "}
							<Link href='/signup'>
								<a>Sign up!</a>
							</Link>
						</span>
					</div>
					<div className={sass.info}>
						<Booking />
						<h4>Why Weevely?</h4>
						<span>
							Simply organize your events and share them with
							others! Explore our solutions to create a community,
							calendar or more!
						</span>
					</div>
				</div>
			</div>
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
		</>
	)
}

export async function getServerSideProps(ctx) {
	const user = nookies.get(ctx).user
	if (!!user) {
		ctx.res.writeHead(303, { Location: "/calendars" })
		ctx.res.end()
	}
	return { props: {} }
}

export default signin
