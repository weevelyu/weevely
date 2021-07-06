import styles from "../../styles/app.module.scss"
import { Warning } from "../../lib/icons/Misc"

export const WarningMessage = ({ accounts }) => {
	let provider = "Email"
	switch (accounts[0].providerId) {
		case "google":
			provider = "Google"
			break
		case "github":
			provider = "GitHub"
			break
	}
	return (
		<span className={styles.accountWarning}>
			<Warning /> Some options provided by&nbsp;<b>{provider}</b>&nbsp;may
			be locked
		</span>
	)
}
