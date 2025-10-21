import { fetchApi } from "."

const deleteApi = (
	path: string,
	data: Object = {},
) => fetchApi(path, "DELETE", { body: JSON.stringify(data)})

export default deleteApi