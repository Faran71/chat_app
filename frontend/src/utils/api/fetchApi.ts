import { backendDevelopmentDomain, backendProductionDomain } from "@lumina/shared/constants/strings"

const fetchApi = async (
	path: string,
	method: string = "GET",
	init: RequestInit = {}
) => {
	if (!init.headers) init.headers = {}
	
	let domain

	if (process.env.NODE_ENV === "development") {
		domain = backendDevelopmentDomain
	} else if (process.env.NODE_ENV === "production") {
		domain = backendProductionDomain
	} else {
		domain = "http://localhost:8000"
	}

	const url = domain + path

	const response = await fetch(
		url,
		{
			...init,
			method,
			credentials: "include",
			headers: {
				...init.headers,
				"content-type": "application/json"
			}
		}
	)

	if (!response.ok) {
		throw new Error(response.statusText)
	}

	return response.json()
}

export default fetchApi