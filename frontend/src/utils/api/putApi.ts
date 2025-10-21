import { fetchApi } from "."

const putApi = (
	path: string,
	data: Object = {},
) => fetchApi(path, "PUT", { body: JSON.stringify(data)})

export default putApi