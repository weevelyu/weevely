import { useState } from "react"
import { destroyCookie } from "nookies"
import Link from "next/link"
import axios from "axios"

import styles from "../../styles/app.module.scss"

const AccountDropdown = ({ user }) => {
	const [toggle, setToggle] = useState(false)

	const logout = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer" + user.token,
			},
			url: "http://paxanddos.ddns.net:8000/api/auth/signout",
		}
		axios.post(api.url, null, { headers: api.headers }).then(() => {
			destroyCookie(null, "user")
			location.href = "/"
			return "Goodbye!"
		})
	}

	return (
		<>
			<button
				onClick={() => setToggle(!toggle)}
				className={styles.barAccountButton}
			>
				<img src={user.image} alt='picture' />
			</button>
			{toggle && (
				<div className={styles.dropdownBarOptions}>
					<Link href='/account'>
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
