import express from "express"
import createMessage from "../handlers/messages/createMessage"
import updateMessage from "../handlers/messages/updateMessage"
import deleteMessage from "../handlers/messages/deleteMessage"
import getMessages from "../handlers/messages/getMessages"

const router = express.Router()

router
  .post("/", createMessage)           
  .put("/:id", updateMessage)         
  .delete("/:id", deleteMessage)      
  .get("/", getMessages)

export default router
