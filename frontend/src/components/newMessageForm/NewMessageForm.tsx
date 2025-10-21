import React, { useState, useContext } from "react"
import { postApi } from "../../utils/api"
import { snackbarOpen } from "../../utils/misc"
import { Context } from "../../context"
import "./NewMessageForm.css"

const NewMessageForm = ({ onMessageCreated }: { onMessageCreated: () => void }) => {
  const [text, setText] = useState("")
  const { signedInUser, setSnackbar, setSnackbarShown } = useContext(Context)

  const handlePostMessage = async () => {
    if (!text.trim()) return

    try {
      await postApi("/messages", {
        text,
        user_id: signedInUser?.id,
      })
      setText("")
      snackbarOpen(setSnackbarShown, setSnackbar, "Message posted!", "standard", "success")
      onMessageCreated() // refresh feed
    } catch (err) {
      console.error(err)
      snackbarOpen(setSnackbarShown, setSnackbar, "Failed to post message", "standard", "error")
    }
  }

  return (
    <div className="new-message-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handlePostMessage}>Post</button>
    </div>
  )
}

export default NewMessageForm
