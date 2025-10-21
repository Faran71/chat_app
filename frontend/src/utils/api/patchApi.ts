import { fetchApi } from "."

const patchApi = (
	path: string,
	data: Object = {},
) => fetchApi(path, "PATCH", { body: JSON.stringify(data)})

export default patchApi