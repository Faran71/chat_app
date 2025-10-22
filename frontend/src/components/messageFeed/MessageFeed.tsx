import React, { useEffect, useState, useContext } from "react"
import { deleteApi, getApi } from "../../utils/api"
import { Context } from "../../context"
import { MdDelete } from "react-icons/md"
import "./MessageFeed.css"
import { snackbarOpen } from "../../utils/misc"

interface IMessage {
  id: number
  text: string
  user_id: number
  created_at: string
  first_name?: string
  last_name?: string
  profile_picture?: string
}

interface MessageFeedProps {
  search?: string
}

const MessageFeed = ({ search = "" }: MessageFeedProps) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { signedInUser, setSnackbar, setSnackbarShown } = useContext(Context)

  const fetchMessages = async () => {
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : ""
      const res = await getApi(`/messages${query}`)
      setMessages(res.messages)
    } catch (err) {
      console.error("Failed to load messages:", err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [search]) // refetch whenever search term changes

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await deleteApi(`/messages/${messageId}`)
      snackbarOpen(setSnackbarShown, setSnackbar, "Message deleted!", "standard", "success")
      fetchMessages()
    } catch (err) {
      console.error("Failed to delete message:", err)
      snackbarOpen(setSnackbarShown, setSnackbar, "Failed to delete message", "standard", "error")
    }
  }

  return (
    <div className="message-feed">
      {messages.length === 0 ? (
        <p className="no-messages">
          {search ? "No messages found for your search." : "No messages yet..."}
        </p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-header">
              <img
                src={
                  msg.profile_picture
                    ? `/res/icons/${msg.profile_picture}`
                    : "/res/icons/owl.png"
                }
                alt="User avatar"
                className="message-avatar"
              />

              <div className="message-info">
                <p className="message-user">
                  {msg.first_name} {msg.last_name}
                </p>
                <p className="message-date">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>

              {signedInUser?.id === msg.user_id && (
                <MdDelete
                  className="delete-icon"
                  onClick={() => handleDeleteMessage(msg.id)}
                />
              )}
            </div>

            <p className="message-text">{msg.text}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MessageFeed
