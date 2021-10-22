import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import nookies from "nookies"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import Header from "../../components/Base"
import sass from "../../styles/login.module.sass"

const ResetPassword = () => {
	const [email, setEmail] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				email: email,
			},
			url: `${process.env.API_URL}/auth/reset-password`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Sending reset link...",
			success: (response) => {
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
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
		<>
			<Head>
				<title>Reset password &#8739; Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div>
				<Header />
				<div className={sass.login}>
					<div className={sass.fields}>
						<h1>We&apos;ll get your password back!</h1>
						<span></span>
						<form
							onSubmit={(e) => handleSubmit(e.preventDefault())}
						>
							<label>
								Your email
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</label>
							<button type='submit'>Send email</button>
						</form>
						<span>
							Everything&apos;s fine?{" "}
							<Link href='/signin'>
								<a>Go back.</a>
							</Link>
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
				destination: "/signin",
			},
		}

	return { props: {} }
}

export default ResetPassword
