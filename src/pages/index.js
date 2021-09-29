import Head from "next/head"

import Header from "../components/Base"
import Welcome from "../components/Welcome"

export default function index() {
	return (
		<>
			<Head>
				<title>Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div>
				<Header />
				<Welcome />
			</div>
		</>
	)
}
