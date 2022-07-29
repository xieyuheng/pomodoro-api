import { Model } from "@/framework/database/Model"
import { Obtain, ty } from "@xieyuheng/ty"

export const AccessTokenSchema = ty.object({
  user_id: ty.string(),
  token: ty.string(),
})

export type AccessTokenJson = Obtain<typeof AccessTokenSchema>

export interface AccessToken extends AccessTokenJson {}

export class AccessToken extends Model<AccessTokenJson> {
  schema = AccessTokenSchema
}
