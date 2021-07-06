import Head from "next/head"
import Bar from "../components/Base/Bar"
import scss from "../styles/app.module.scss"

export default function Application({ children, session, title }) {
	return (
		<>
			<Head>
				<title>{title} &#8739; Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div className={scss.app}>
				<Bar session={session} />
				<main>{children}</main>
			</div>
		</>
	)
}
