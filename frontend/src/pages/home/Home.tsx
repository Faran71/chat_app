import React, { useState } from "react"
import { Box, Page } from "../../components"
import "./Home.css"
import background from "../../../../res/nature_background.jpg"
import NewMessageForm from "../../components/newMessageForm/NewMessageForm"
import MessageFeed from "../../components/messageFeed/MessageFeed"

const Home = () => {
  const [refreshToggle, setRefreshToggle] = useState(false)
  const [searchInput, setSearchInput] = useState("") // what the user types
  const [searchTerm, setSearchTerm] = useState("") // what’s actually searched

  const refreshMessages = () => setRefreshToggle(!refreshToggle)

  const handleSearch = () => {
    setSearchTerm(searchInput.trim()) // activate search when clicking the button
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch() // press Enter to search
  }

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

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <MessageFeed key={refreshToggle ? "A" : "B"} search={searchTerm} />
      </div>

      <Box type="flex" justifyContent="center" className="testing">
        <p>© Its Mine</p>
      </Box>
    </Page>
  )
}

export default Home
