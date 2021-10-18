import Head from "next/head"
import Bar from "../components/Base/Bar"
import scss from "../styles/app.module.scss"

const Application = ({ children, user, title }) => {
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
				<Bar user={user} />
				<main>{children}</main>
			</div>
		</>
	)
}

export default Application
