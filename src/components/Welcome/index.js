import Link from "next/link"

import style from "../../styles/welcome.module.scss"
import { Logo } from "../../lib/icons/Brand"
import { InfoBlock, InfoBlockReverse } from "./InfoBlock"
import Footer from "./Footer"

import calendar from "../../lib/images/calendar.png"
import calendars from "../../lib/images/calendars.png"
import event from "../../lib/images/event.png"
import share from "../../lib/images/share.png"
import account from "../../lib/images/account.png"

const Welcome = () => {
	return (
		<div className={style.welcome}>
			<div className={style.welcomeHead}>
				<h1 className={style.welcomeHeadH}>
					Make your life easier with Weevely
				</h1>
				<span className={style.welcomeHeadS}>
					Calendars, sharing, everything you need to manage your
					events from start to finish.
				</span>
				<Link href='/signin'>
					<button className={style.welcomeButtonStart}>
						Start using
					</button>
				</Link>
			</div>
			<div className={style.welcomeInfo}>
				<InfoBlock
					image={calendar}
					heading={"Manage your life."}
					content={
						"Everything you need to manage your life and work. Create different events to do not forget anything!"
					}
				/>
				<InfoBlockReverse
					image={event}
					heading={"Your events - your rules."}
					content={
						"Powerful preferences to create the event of your dream."
					}
				/>
				<InfoBlock
					image={calendars}
					heading={"More calendars - more fun!"}
					content={
						"Create as many calendars as you want for every life matter. You always will have one calendar for yourself, with holidays of your country."
					}
				/>
				<InfoBlockReverse
					image={share}
					heading={"You're not alone here!"}
					content={
						"Share your calendars with your friends, coworkers, or employees! All of you can add as many events as you want!"
					}
				/>
				<InfoBlock
					image={account}
					heading={"Customize yourself"}
					content={
						"Change nickname or avatar, everything to make you unique! But still your ShareID will remain the same, to help others to find you."
					}
				/>
			</div>
			<div className={style.welcomeAd}>
				<Logo />
				<Link href='/signin'>
					<button className={style.welcomeButtonStart}>
						Start using
					</button>
				</Link>
			</div>
			<Footer />
		</div>
	)
}

export default Welcome
