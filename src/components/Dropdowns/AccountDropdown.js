import { destroyCookie } from "nookies"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"

import styles from "../../styles/app.module.scss"

const AccountDropdown = ({ user }) => {
	const router = useRouter()
	const [toggle, setToggle] = useState(false)

	const logout = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			url: `${process.env.API_URL}/auth/signout`,
		}
		axios
			.post(api.url, null, {
				headers: api.headers,
				withCredentials: true,
			})
			.then(() => {
				destroyCookie(null, "user", { path: "/" })
				router.replace("/")
				return "Goodbye!"
			})
	}

	return (
		<>
			<button
				onClick={() => setToggle(!toggle)}
				className={styles.barAccountButton}
			>
				<div className={styles.barAccountImage}>
					<Image
						src={user.image}
						className={styles.barAccountImage}
						width={34}
						height={34}
						alt='avatarPreview'
						quality={60}
						objectFit='cover'
					/>
				</div>
			</button>
			{toggle && (
				<div className={styles.dropdownBarOptions}>
					<Link href='/account' passHref>
						<button className={styles.dropdownBarOption}>
							Account
						</button>
					</Link>
					<Link href={`/user/${user.name}`}>
						<button className={styles.dropdownBarOption}>
							Public profile
						</button>
					</Link>
					<button
						className={styles.dropdownBarOption}
						name='danger'
						onClick={() => logout()}
					>
						Logout
					</button>
				</div>
			)}
		</>
	)
}

export default AccountDropdown
