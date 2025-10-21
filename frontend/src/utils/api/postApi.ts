import { fetchApi } from "."

const postApi = (
	path: string,
	data: Object = {},
) => fetchApi(path, "POST", { body: JSON.stringify(data)})

export default postApi