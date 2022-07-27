import { VerifyingJson } from "@/types/VerifyingJson"
import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../../config"
import { Mailer } from "../../infra/mailer"
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

    const entity = await EmailRegister.repository.createAndSave(json)

    const confirmation_link = `${config.base_url}/api/register/${entity.confirmation_token}/confirm`

    const mailer = this.app.create(Mailer)

    await mailer.send({
      to: entity.email,
      from: `"Pomodoro" <support@readonly.link>`,
      subject: `Pomodoro | Register Confirmation | ${entity.confirmation_code}`,
      text: `Confirmation link: ${confirmation_link}`,
    })

    return {
      username: entity.username,
      email: entity.email,
      confirmation_code: entity.confirmation_code,
      verification_token: entity.verification_token,
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
    const entity = await EmailRegister.getByToken(token)

    if (entity === null) return undefined
    if (entity.revoked_at) return undefined
    if (entity.verified_at) return undefined

    if (!entity.confirmed_at) return { confirmed: false }

    entity.verified_at = Date.now()
    await entity.save()

    return { confirmed: true, username: entity.username }
  }

  async confirm(token: string): Promise<undefined> {
    const entity = await EmailRegister.getByToken(token)

    if (entity === null) return undefined
    if (entity.revoked_at) return undefined
    if (entity.verified_at) return undefined
    if (entity.confirmed_at) return undefined

    entity.confirmed_at = Date.now()
    await entity.save()

    await this.sendRedirect(
      "/notifications/register-email-confirmation-success"
    )
  }

  async revoke(token: string): Promise<undefined> {
    const entity = await EmailRegister.getByToken(token)

    if (entity === null) return undefined
    if (entity.revoked_at) return undefined
    if (entity.verified_at) return undefined
    if (entity.confirmed_at) return undefined

    entity.revoked_at = Date.now()
    await entity.save()
  }
}
