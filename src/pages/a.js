import { useSession, signIn, signOut } from "next-auth/client"

export default function a() {
	const [session] = useSession()
	return (
		<div>
			{session ? (
				<button onClick={signOut}>Log out</button>
			) : (
				<button onClick={signIn}>Log in</button>
			)}
		</div>
	)
}
