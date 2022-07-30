import { Model } from "@/framework/database/Model"
import { Obtain, ty } from "@xieyuheng/ty"

export const EmailLoginSchema = ty.object({
  email: ty.string(),
  verification_token: ty.string(),
  confirmation_token: ty.string(),
  confirmation_code: ty.string(),
  confirmed_at: ty.optional(ty.number()),
  verified_at: ty.optional(ty.number()),
  revoked_at: ty.optional(ty.number()),
})

export type EmailLoginJson = Obtain<typeof EmailLoginSchema>

export interface EmailLogin extends EmailLoginJson {}

export class EmailLogin extends Model<EmailLoginJson> {
  schema = EmailLoginSchema
}
