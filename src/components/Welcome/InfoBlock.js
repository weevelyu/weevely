import Image from "next/image"
import style from "../../styles/welcome.module.scss"

export const InfoBlock = ({ image, heading, content }) => {
	return (
		<div className={style.welcomeInfoBlock}>
			<Image
				src={image}
				alt='calendarPreview'
				className={style.welcomeInfoBlockImage}
				quality={100}
				objectFit='contain'
				placeholder='blur'
				loading='lazy'
			/>
			<div className={style.welcomeInfoBlockText}>
				<h2 className={style.welcomeInfoBlockTextH}>{heading}</h2>
				<span className={style.welcomeInfoBlockTextS}>{content}</span>
			</div>
		</div>
	)
}

export const InfoBlockReverse = ({ image, heading, content }) => {
	return (
		<div className={style.welcomeInfoBlock}>
			<div className={style.welcomeInfoBlockText}>
				<h2 className={style.welcomeInfoBlockTextH}>{heading}</h2>
				<span className={style.welcomeInfoBlockTextS}>{content}</span>
			</div>
			<Image
				src={image}
				alt='calendarPreview'
				className={style.welcomeInfoBlockImage}
				quality={100}
				objectFit='contain'
				placeholder='blur'
				loading='lazy'
			/>
		</div>
	)
}
