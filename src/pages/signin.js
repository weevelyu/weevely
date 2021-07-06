import Head from "next/head"
import {
	getCsrfToken,
	getProviders,
	signIn,
	getSession,
} from "next-auth/client"
import Link from "next/link"

import Header from "../components/Base"
import { Google, GitHub } from "../lib/icons/Social"
import { Booking } from "../lib/icons/Undraw"
import sass from "../styles/login.module.sass"

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function signin({ providers, csrfToken }) {
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
						<form method='post' action='/api/auth/signin/email'>
							<input
								name='csrfToken'
								type='hidden'
								defaultValue={csrfToken}
							/>
							<label>
								Email address
								<input
									type='email'
									id='email'
									name='email'
									required
								/>
							</label>
							<button type='submit'>Sign in with Email</button>
						</form>
						<h4>
							<span>OR</span>
						</h4>
						{Object.values(providers).map(
							(provider) =>
								provider.name !== "Email" &&
								(provider.name == "Google" ? (
									<div key={provider.name}>
										<button
											id={provider.name}
											onClick={() => signIn(provider.id)}
										>
											<Google />
											Continue with {provider.name}
										</button>
									</div>
								) : (
									<div key={provider.name}>
										<button
											id={provider.name}
											onClick={() => signIn(provider.id)}
										>
											<GitHub />
											Continue with {provider.name}
										</button>
									</div>
								))
						)}
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
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	const session = await getSession({ req })
	if (session) {
		res.writeHead(302, { Location: "/calendars" })
		res.end()
		return {}
	} else {
		const csrfToken = await getCsrfToken({ req })
		const providers = await getProviders()
		return {
			props: { providers, csrfToken },
		}
	}
}
