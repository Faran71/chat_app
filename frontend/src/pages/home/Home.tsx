import React, { Dispatch, SetStateAction, useState } from "react"
import { Box, Button, Page } from "../../components"
import "./Home.css"
import { getApi } from "../../utils/api"
import background from "../../../../res/nature_background.jpg"
import NewMessageForm from "../../components/newMessageForm/NewMessageForm"
import MessageFeed from "../../components/messageFeed/MessageFeed"

const Home = () => {
	const [refreshToggle, setRefreshToggle] = useState(false)

	const refreshMessages = () => setRefreshToggle(!refreshToggle)

	return (
		<Page
			styles={{
				backgroundImage: `url(${background})`,
				backgroundPosition: "bottom",
				backgroundSize: "cover"
			}}
		>
			<div className="messages-container">
				<NewMessageForm onMessageCreated={refreshMessages} />
				<MessageFeed key={refreshToggle ? "A" : "B"} />
			</div>
			<Box
				type="flex"
				justifyContent="center"
				className="testing"
			>
				<p>© Its Mine</p>
			</Box>
		</Page>
	)
}

export default Home