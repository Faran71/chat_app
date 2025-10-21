const delay = async (millseconds: number) => {
	return new Promise(resolve => setTimeout(resolve, millseconds))
}

export default delay