import nookies from "nookies"
import axios from "axios"
import UserBanner from "../../components/User/UserBanner"
import UserSharedCalendars from "../../components/User/UserSharedCalendars"
import styles from "../../styles/app.module.scss"
import Application from "../../components/Layout"

const user = ({ user, owner, isOwner }) => {
	return (
		<Application user={user} title={user.name}>
			<h1 className={styles.pageTitle}>{user.name}</h1>
			<div className={styles.userPage}>
				<UserBanner owner={owner} isOwner={isOwner} />
				<UserSharedCalendars />
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	if (!!!cookie)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	const user = JSON.parse(cookie)
	const response = await axios
		.get(`${process.env.API_URL}/users/${ctx.params.name}`, {
			headers: {
				Accept: "application/json",
				Authorization: user.token,
			},
		})
		.catch(() => {
			return false
		})

	if (!response)
		return {
			redirect: {
				permanent: false,
				destination: `/user/${user.name}`,
			},
		}

	return {
		props: {
			user: user,
			owner: response.data,
			isOwner: user.name === response.data.name,
		},
	}
}

export default user
