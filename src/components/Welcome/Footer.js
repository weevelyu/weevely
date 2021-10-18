import Link from "next/link"
import { Logo } from "../../lib/icons/Brand"
import { Email, Facebook, GitHub, Telegram } from "../../lib/icons/Social"
import style from "../../styles/welcome.module.scss"

const Footer = () => {
	return (
		<div className={style.footer}>
			<div className={style.footerLeft}>
				<Logo />
				<span>Weevely</span>
				<Link href='https://github.com/PAXANDDOS/weevely-next'>
					<GitHub />
				</Link>
				<Link href='https://t.me/PAXANDDOS'>
					<Telegram />
				</Link>
				<Link href='https://www.facebook.com/paxanddos/'>
					<Facebook />
				</Link>
			</div>
			<div className={style.footerRight}>
				<span>
					Copyright © 2021{" "}
					<Link href='https://paxanddos.github.io/'>
						Paul Litovka
					</Link>
					. All rights reserved.
				</span>
			</div>
		</div>
	)
}
export default Footer
