import { Redis } from "@/framework/database/Redis"
import { Mailer } from "@/framework/mail/Mailer"
import { Controller } from "@/framework/routing/Controller"
import { VerifyingJson } from "@/types/VerifyingJson"
import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../../config"
import { AccessToken } from "../models/AccessToken"
import { EmailRegister } from "../models/EmailRegister"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class EmailRegisterController extends Controller {
  async create(): Promise<VerifyingJson> {
    const app = await useApp()
    const redis = app.create(Redis)
    const mailer = app.create(Mailer)

    const scheme = ty.object({
      username: ty.string(),
      name: ty.string(),
      email: ty.string(),
    })

    const json = {
      ...scheme.validate(await this.body()),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const fiveMinutes = 5 * 60
    const model = await redis.repo(EmailRegister).createAndSave(json)
    await model.expire(fiveMinutes)

    const confirmation_link = `${config.base_url}/api/register/${model.confirmation_token}/confirm`

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

  async verify(token: string): Promise<boolean | undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailRegister).firstWhere({
      verification_token: token,
    })

    if (!model) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined

    if (!model.confirmed_at) return false

    model.verified_at = Date.now()
    await model.save()

    const user = await redis.repo(User).createAndSave({
      username: model.username,
      name: model.name,
      email: model.email,
    })

    const oneWeek = 60 * 60 * 24 * 7
    const access = await redis.repo(AccessToken).createAndSave({
      user_id: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    })
    await access.expire(oneWeek)
    this.setCookie("token", access.token, {
      sameSite: "lax",
      maxAge: oneWeek,
    })

    return true
  }

  async confirm(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailRegister).firstWhere({
      confirmation_token: token,
    })

    if (!model) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.confirmed_at = Date.now()
    await model.save()

    await this.redirect("/notifications/register-email-confirmation-success")
  }

  async revoke(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailRegister).firstWhere({
      verification_token: token,
    })

    if (!model) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.revoked_at = Date.now()
    await model.save()
  }
}
