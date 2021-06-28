import { getSession } from "next-auth/client"

import Application from "../components/Layout"
import scss from "../styles/calendars.module.scss"

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function calendars({ user }) {
	return (
		<Application user={user}>
			<h1>Shared calendars</h1>
			<div className={scss.calendarList}>
				<section>
					<div>
						<h2>Name</h2>
						<div>
							<span>0 upcoming events</span>
							<span>Private</span>
							<span>Created a few days ago</span>
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
