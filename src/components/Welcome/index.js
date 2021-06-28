import Link from "next/link"

import { Events } from "../../lib/icons/Undraw"
import scss from "../../styles/welcome.module.scss"

export default function Welcome() {
	return (
		<div className={scss.welcome}>
			<div>
				<h1>Events made easy</h1>
				<span>
					Calendars, ticketing, and powerful WordPress tools to manage
					your events from start to finish.
				</span>
				<Link href='/signin'>
					<button>Start using</button>
				</Link>
				<Events />
			</div>
		</div>
	)
}
