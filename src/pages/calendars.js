import { getSession } from "next-auth/client"

import Application from "../components/Layout"
import scss from "../styles/calendars.module.scss"
import { Lock, Link, Party, Time } from "../lib/icons/Misc"

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function calendars({ user }) {
	return (
		<Application user={user}>
			<h1>Your calendars</h1>
			<div className={scss.calendarList}>
				<section>
					<div>
						<h2>Name</h2>
						<div>
							<span>
								<Party />0 upcoming events
							</span>
							<span>
								<Lock />
								Private
							</span>
							<span>
								<Time />
								Created a few days ago
							</span>
						</div>
					</div>
					<button>Open</button>
				</section>
			</div>
		</Application>
	)
}

export async function getServerSideProps({ req, res }) {
	const session = await getSession({ req })
	if (!session) {
		res.writeHead(302, { Location: "/signin" })
		res.end()
		return {}
	}

	return { props: { user: session.user } }
}
