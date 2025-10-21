import React, { Dispatch, SetStateAction, useState } from "react"
import { Box, Button, Page } from "../../components"
import "./Home.css"
import { getApi } from "../../utils/api"
import background from "../../../../res/background.jpg"

const Home = () => {
	const [testingBackendAPIData, setTestingBackendAPIData]: [
		string,
		Dispatch<SetStateAction<string>>
	] = useState<string>("")
	const testBackendAPI = async () => {
		try {
			const res = await getApi("/testing")
			setTestingBackendAPIData(res.testOutput)
		} catch {
			setTestingBackendAPIData("Error whilst fetching...")
		}
	}

	return (
		<Page
			styles={{
				backgroundImage: `url(${background})`,
				backgroundPosition: "bottom",
				backgroundSize: "cover"
			}}
		>
			<Box
				type="flex"
				justifyContent="center"
				className="testing"
			>
				<p>Test the Backend API: {testingBackendAPIData || "Nothing returned..."}</p>
				<Button
					onClick={testBackendAPI}
					type="button"
				>
					Send Request
				</Button>
			</Box>
		</Page>
	)
}

export default Home