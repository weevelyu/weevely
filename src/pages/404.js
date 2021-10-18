import Head from "next/head"
import Link from "next/link"
import Header from "../components/Base"

const Custom404 = () => {
	return (
		<>
			<Head>
				<title>404 Not Found | Weevely</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div>
				<Header />
				<h1>
					Looks like you have lost! <Link href='/'>Go home.</Link>
				</h1>
			</div>
		</>
	)
}

export default Custom404
