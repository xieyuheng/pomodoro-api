import { Model } from "../framework/database/Model"
import { UserJson, UserSchema } from "../jsons/UserJson"

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = UserSchema
}
