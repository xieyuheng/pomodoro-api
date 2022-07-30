import { Redis } from "@/framework/database/Redis"
import { Mailer } from "@/framework/mail/Mailer"
import { Controller } from "@/framework/routing/Controller"
import { VerifyingJson } from "@/types/VerifyingJson"
import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../../config"
import { AccessToken } from "../models/AccessToken"
import { EmailLogin } from "../models/EmailLogin"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class EmailLoginController extends Controller {
  async create(): Promise<VerifyingJson> {
    const app = await useApp()
    const redis = app.create(Redis)
    const mailer = app.create(Mailer)

    const scheme = ty.object({
      email: ty.string(),
    })

    const json = {
      ...scheme.validate(await this.body()),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const model = await redis.repo(EmailLogin).create(json)
    await model.save()

    const confirmation_link = `${config.base_url}/api/login/${model.confirmation_token}/confirm`

    await mailer.send({
      to: model.email,
      from: `"Pomodoro" <support@readonly.link>`,
      subject: `Pomodoro | Login Confirmation | ${model.confirmation_code}`,
      text: `Confirmation link: ${confirmation_link}`,
    })

    return {
      username: "TODO",
      email: model.email,
      confirmation_code: model.confirmation_code,
      verification_token: model.verification_token,
    }
  }

  async verify(token: string): Promise<boolean | undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      verification_token: token,
    })

    if (model === null) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined

    if (!model.confirmed_at) return false

    model.verified_at = Date.now()
    await model.save()

    const user = await redis.repo(User).create(model)
    await user.save()

    const access = await redis.repo(AccessToken).create({
      user_id: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    })
    await access.save()

    this.setCookie("token", access.token, {
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return true
  }

  async confirm(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      confirmation_token: token,
    })

    if (model === null) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.confirmed_at = Date.now()
    await model.save()

    await this.redirect("/notifications/login-email-confirmation-success")
  }

  async revoke(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
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
