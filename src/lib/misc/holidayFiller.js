import { HolidayAPI } from "holidayapi"
import { IpregistryClient } from "@ipregistry/client"

const key = process.env.HOLIDAY_API_KEY
const holidayApi = new HolidayAPI({ key })
const ipRegistry = new IpregistryClient(process.env.IPREGISTRY_API_KEY)

async function getIp() {
	const response = await fetch("https://api.ipify.org/?format=json")
	return response.json()
}

async function getCountry(ip) {
	const response = await ipRegistry.lookup(ip)
	return response.data.location.country.code
}

export default function getHolidays() {
	const ip = getIp()
	const country = getCountry(ip.ip)
	const year = new Date().getFullYear()

	return holidayApi.holidays({
		country: country,
		year: year - 1,
	})
}
