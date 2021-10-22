import axios from "axios"
import Head from "next/head"
import nookies from "nookies"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import Header from "../../components/Base"
import sass from "../../styles/login.module.sass"

const ResetPasswordToken = ({ token }) => {
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				password: password,
				password_confirmation: passwordConfirm,
			},
			url: `${process.env.API_URL}/auth/reset-password/${token}`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Updating ...",
			success: (response) => {
				location.replace("/signin")
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
								Enter new password
								<input
									type='password'
									value={password}
									minLength={8}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</label>
							<label>
								Repeat new password
								<input
									type='password'
									value={passwordConfirm}
									minLength={8}
									onChange={(e) =>
										setPasswordConfirm(e.target.value)
									}
									required
								/>
							</label>
							<button type='submit'>Change password</button>
						</form>
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

	return { props: { token: ctx.params.token } }
}

export default ResetPasswordToken
