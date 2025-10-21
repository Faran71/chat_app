import { z } from "zod"
import { OUser } from "./objects"

export type TUser = z.infer<typeof OUser>
export type TPreAccountUser = Exclude<TUser, "id">