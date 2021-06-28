import Bar from "../components/Base/Bar"
import scss from "../styles/app.module.scss"

export default function Application({ children, user }) {
	return (
		<div className={scss.app}>
			<Bar image={user.image} />
			<main>{children}</main>
		</div>
	)
}
