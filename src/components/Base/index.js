import Link from "next/link"

import { Logo } from "../../lib/icons/Brand"
import scss from "../../styles/header.module.scss"

const Header = () => {
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
					<Link href='/signin'>
						<a>Sign in</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Header
