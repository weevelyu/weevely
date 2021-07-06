import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"

import Header from "../components/Base"
import Welcome from "../components/Welcome"

export default function index() {
	const [session, loading] = useSession()
	if (session && !loading) {
		const router = useRouter()
		router.push("/calendars")
	}
	return (
		<>
			<Head>
				<title>Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div>
				<Header />
				<Welcome />
			</div>
		</>
	)
}
