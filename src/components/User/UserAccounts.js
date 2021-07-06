import { Google, GitHub, Arroba } from "../../lib/icons/Social"

const UserAccouts = ({ accounts }) => {
	return accounts.map((account) => {
		return (
			<button key={account.providerId}>
				&nbsp;&nbsp;&nbsp;
				{account.providerId === "email" && <Arroba width={16} />}
				{account.providerId === "google" && <Google width={16} />}
				{account.providerId === "github" && <GitHub width={16} />}
			</button>
		)
	})
}

export default UserAccouts
