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
		<div>
			<Header />
			<Welcome />
		</div>
	)
}
