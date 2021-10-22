import Head from "next/head"
import nookies from "nookies"

import Header from "../components/Base"
import Welcome from "../components/Welcome"

const index = () => {
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

export async function getServerSideProps(ctx) {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return { props: {} }
}

export default index
