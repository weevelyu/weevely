import axios from "axios"

export default async function addHolidays(calendar_id, token) {
	const ip = await axios.get(`http://checkip.amazonaws.com/`)
	const location = await axios.get(`http://ip-api.com/json/${ip.data}`)
	const api = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		data: {
			country: location.data.countryCode,
			year: new Date().getFullYear() - 1,
		},
		url: `${process.env.API_URL}/calendars/${calendar_id}/holidays`,
	}
	await axios.post(api.url, api.data, { headers: api.headers })
}
