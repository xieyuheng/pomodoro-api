import { ty, Obtain } from "@xieyuheng/ty"
import { Model } from "../../infra/redis/Model"

export const EmailRegisterSchema = ty.object({
  username: ty.string(),
  name: ty.string(),
  email: ty.string(),
  verification_token: ty.string(),
  confirmation_token: ty.string(),
  confirmation_code: ty.string(),
  confirmed_at: ty.optional(ty.number()),
  verified_at: ty.optional(ty.number()),
  revoked_at: ty.optional(ty.number()),
})

export type EmailRegisterJson = Obtain<typeof EmailRegisterSchema>

export interface EmailRegister extends EmailRegisterJson {}

export class EmailRegister extends Model<EmailRegisterJson> {
  schema = EmailRegisterSchema
}
