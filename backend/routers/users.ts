import express from "express"
import updateUser from "../handlers/users/updateUser"
import updateUserName from "../handlers/users/updateUserName"
import deleteUser from "../handlers/users/deleteUser"
import updatePassword from "../handlers/users/updatePassword"
import updateProfilePicture from "../handlers/users/updateProfilePicture"

const router = express.Router()

router
  .put("/:id", updateUser)               
  .put("/:id/name", updateUserName)       
  .delete("/:id", deleteUser)             
  .put("/:id/password", updatePassword)
  .put("/:id/profile-picture", updateProfilePicture)

export default router
