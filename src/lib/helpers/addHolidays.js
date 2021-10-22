import axios from "axios"

export default async function addHolidays(calendar_id, token) {
	const response = await axios.get(`https://api.db-ip.com/v2/free/self`)
	const api = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		data: {
			country: response.data.countryCode,
			year: new Date().getFullYear() - 1,
		},
		url: `${process.env.API_URL}/calendars/${calendar_id}/holidays`,
	}
	await axios.post(api.url, api.data, { headers: api.headers })
}
