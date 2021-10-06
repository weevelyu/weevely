import styles from "../../../styles/app.module.scss"
import Application from "../../../components/Layout"

const event = ({ user }) => {
	return (
		<Application user={user}>
			<h1 className={styles.pageTitle}>Your account</h1>
		</Application>
	)
}

export async function getServerSideProps(ctx) {}

export default event
