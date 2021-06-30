import Bar from "../components/Base/Bar"
import scss from "../styles/app.module.scss"

export default function Application({ children, session }) {
	return (
		<div className={scss.app}>
			<Bar session={session} />
			<main>{children}</main>
		</div>
	)
}
