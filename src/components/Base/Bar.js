import { useRouter } from "next/router"
import Link from "next/link"

import scss from "../../styles/bar.module.scss"
import { Logo } from "../../lib/icons/Brand"
import { Calendar, Shared } from "../../lib/icons/Misc"

export default function Bar({ image }) {
	const { pathname } = useRouter()
	return (
		<div className={scss.bar}>
			<div>
				<Link href='/calendars'>
					<button>
						<Logo />
					</button>
				</Link>
				<Link href='/calendars'>
					{pathname === "/calendars" ? (
						<button className={scss.active}>
							<Calendar />
						</button>
					) : (
						<button>
							<Calendar />
						</button>
					)}
				</Link>
				<Link href='/shared'>
					{pathname === "/shared" ? (
						<button className={scss.active}>
							<Shared />
						</button>
					) : (
						<button>
							<Shared />
						</button>
					)}
				</Link>
			</div>
			<div>
				<Link href='/account'>
					<button>
						<img src={image} alt='picture' />
					</button>
				</Link>
			</div>
		</div>
	)
}
