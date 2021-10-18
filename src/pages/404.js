import Head from "next/head"
import Link from "next/link"
import nookies from "nookies"

import Header from "../components/Base"

const Custom404 = () => {
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
				<h1>
					Looks like you've lost! <Link href='/'>Go home.</Link>
				</h1>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {
	const user = nookies.get(ctx).user
	if (!!user) {
		ctx.res.writeHead(303, { Location: "/calendars" })
		ctx.res.end()
	}
	return { props: {} }
}

export default Custom404
