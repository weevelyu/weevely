import { useState } from "react"
import axios from "axios"
import nookies, { setCookie } from "nookies"
import toast, { Toaster } from "react-hot-toast"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import Header from "../components/Base"
import { Checking } from "../lib/icons/Undraw"
import sass from "../styles/login.module.sass"

const Signup = () => {
	const router = useRouter()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const handleChange = (e) => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break
			case "email":
				setEmail(e.target.value)
				break
			case "password":
				setPassword(e.target.value)
				break
			case "passwordConfirmation":
				setPasswordConfirmation(e.target.value)
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
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
			},
			url: `${process.env.API_URL}/auth/register`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
			withCredentials: true,
		})
		toast.promise(promise, {
			loading: "Signing up..",
			success: (response) => {
				setCookie(null, "user", response.data.cookie, {
					maxAge: JSON.parse(response.data.cookie).ttl,
					path: "/",
				})
				router.replace("/calendars")
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
							toast.error(error.response.data.errors.password[i])
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
				<title>Sign up &#8739; Weevely</title>
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
							Sign up to gain access to all features of the
							application, create and manage events and connect to
							others.
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
								Your email
								<input
									type='email'
									id='email'
									name='email'
									value={email}
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
									minLength={8}
									value={password}
									onChange={handleChange}
									required
								/>
							</label>
							<label>
								Repeat your password
								<input
									type='password'
									id='passwordConfirmation'
									name='passwordConfirmation'
									value={passwordConfirmation}
									onChange={handleChange}
									required
								/>
							</label>
							<button type='submit'>Sign up</button>
						</form>
						<span>
							Already a member?{" "}
							<Link href='/signin'>
								<a>Sign in!</a>
							</Link>
						</span>
					</div>
					<div className={sass.info}>
						<Checking />
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
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/calendars",
			},
		}

	return { props: {} }
}

export default Signup
