import Link from "next/link"

import { Logo } from "../../lib/icons/Brand"
import scss from "../../styles/header.module.scss"

export default function Header() {
	return (
		<div className={scss.header}>
			<div>
				<Link href='/'>
					<div>
						<Logo />
						<label>Weevely</label>
					</div>
				</Link>
				<div>
					<Link href='/about'>
						<a>About</a>
					</Link>
					<Link href='/privacy-policy'>
						<a>Privacy Policy</a>
					</Link>
					<Link href='/contact'>
						<a>Contact us</a>
					</Link>
				</div>
				<div>
					<Link href='/signin'>
						<a>Login</a>
					</Link>
				</div>
			</div>
		</div>
	)
}
