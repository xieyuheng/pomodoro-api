import { ty, Obtain } from "@xieyuheng/ty"
import { Model } from "../../infra/redis/Model"

export const UserSchema = ty.object({
  username: ty.string(),
  name: ty.string(),
  email: ty.string(),
})

export type UserJson = Obtain<typeof UserSchema>

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = UserSchema
}
