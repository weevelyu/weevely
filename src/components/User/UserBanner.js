import Link from "next/link"
import Image from "next/image"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import UserStat from "../../components/User/UserStat"
import styles from "../../styles/app.module.scss"

const UserBanner = ({ owner, isOwner }) => {
	dayjs.extend(relativeTime)

	return (
		<div className={styles.userBanner}>
			<div className={styles.userBannerImageBlock}>
				<Image
					src={owner.image}
					alt='avatarPreview'
					className={styles.userBannerImage}
					width={110}
					height={110}
					layout='fixed'
					quality={100}
					objectFit='cover'
				/>
			</div>
			<div className={styles.userBannerDataBlock}>
				<h2 className={styles.userBannerDataName}>{owner.name}</h2>
				<UserStat title='Share ID' content={owner.shareId} />
				<UserStat
					title='Member for'
					content={dayjs(owner.created_at).fromNow(true)}
				/>
				{isOwner && (
					<Link href='/account'>
						<a className={styles.userBannerOwnerButton}>
							Account settings
						</a>
					</Link>
				)}
			</div>
		</div>
	)
}

export default UserBanner
