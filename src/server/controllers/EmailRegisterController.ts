import { VerifyingJson } from "@/types/VerifyingJson"
import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../../config"
import { Mailer } from "../../framework/mail"
import { Redis } from "../../framework/database"
import { Controller } from "../Controller"
import { EmailRegister } from "../models/EmailRegister"

export class EmailRegisterController extends Controller {
  async create(): Promise<VerifyingJson> {
    const scheme = ty.object({
      username: ty.string(),
      name: ty.string(),
      email: ty.string(),
    })

    const json = {
      ...scheme.validate(await this.useBody()),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const redis = this.app.create(Redis)

    const model = await redis.repository(EmailRegister).create(json)
    await model.save()

    const confirmation_link = `${config.base_url}/api/register/${model.confirmation_token}/confirm`

    const mailer = this.app.create(Mailer)

    await mailer.send({
      to: model.email,
      from: `"Pomodoro" <support@readonly.link>`,
      subject: `Pomodoro | Register Confirmation | ${model.confirmation_code}`,
      text: `Confirmation link: ${confirmation_link}`,
    })

    return {
      username: model.username,
      email: model.email,
      confirmation_code: model.confirmation_code,
      verification_token: model.verification_token,
    }
  }

  async verify(token: string): Promise<
    | {
        confirmed: true
        username: string
      }
    | {
        confirmed: false
      }
    | undefined
  > {
    const redis = this.app.create(Redis)

    const model = await redis.repository(EmailRegister).firstWhere({
      verification_token: token,
    })

    if (model === null) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined

    if (!model.confirmed_at) return { confirmed: false }

    model.verified_at = Date.now()
    await model.save()

    return { confirmed: true, username: model.username }
  }

  async confirm(token: string): Promise<undefined> {
    const redis = this.app.create(Redis)

    const model = await redis.repository(EmailRegister).firstWhere({
      confirmation_token: token,
    })

    if (model === null) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.confirmed_at = Date.now()
    await model.save()

    await this.sendRedirect(
      "/notifications/register-email-confirmation-success"
    )
  }

  async revoke(token: string): Promise<undefined> {
    const redis = this.app.create(Redis)

    const model = await redis.repository(EmailRegister).firstWhere({
      verification_token: token,
    })

    if (model === null) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.revoked_at = Date.now()
    await model.save()
  }
}
