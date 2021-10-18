import { Logo } from "../../lib/icons/Brand"
import { Facebook, GitHub, Telegram } from "../../lib/icons/Social"
import style from "../../styles/welcome.module.scss"

const Footer = () => {
	return (
		<div className={style.footer}>
			<div className={style.footerLeft}>
				<Logo />
				<span>Weevely</span>
				<a href='https://github.com/PAXANDDOS/weevely-next'>
					<GitHub />
				</a>
				<a href='https://t.me/PAXANDDOS'>
					<Telegram />
				</a>
				<a href='https://www.facebook.com/paxanddos/'>
					<Facebook />
				</a>
			</div>
			<div className={style.footerRight}>
				<span>
					Copyright © 2021{" "}
					<a href='https://paxanddos.github.io/'>Paul Litovka</a>. All
					rights reserved.
				</span>
			</div>
		</div>
	)
}
export default Footer
