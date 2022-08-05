import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../config"
import { Redis } from "../framework/database/Redis"
import { Mailer } from "../framework/mail/Mailer"
import { Controller } from "../framework/routing/Controller"
import { VerifyingJson } from "../jsons/VerifyingJson"
import { AccessToken } from "../models/AccessToken"
import { EmailLogin } from "../models/EmailLogin"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class EmailLoginController extends Controller {
  async create(): Promise<VerifyingJson | undefined> {
    const app = await useApp()
    const redis = app.create(Redis)
    const mailer = app.create(Mailer)

    const scheme = ty.object({
      email: ty.string(),
    })

    const json = {
      ...scheme.validate(this.req.body),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const user = await redis.repo(User).firstWhere({ email: json.email })
    // TODO return error for form
    if (!user) {
      this.res.status(404).end()
      return
    }

    const fiveMinutes = 5 * 60
    const model = await redis.repo(EmailLogin).createAndSave(json)
    await model.expire(fiveMinutes)

    const confirmation_link = `${config.base_url}/api/login/${model.confirmation_token}/confirm`

    await mailer.send({
      to: model.email,
      from: `"Pomodoro" <support@readonly.link>`,
      subject: `Pomodoro | Login Confirmation | ${model.confirmation_code}`,
      text: `Confirmation link: ${confirmation_link}`,
    })

    return {
      username: user.username,
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

    if (!model) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined

    if (!model.confirmed_at) return false

    model.verified_at = Date.now()
    await model.save()

    const user = await redis.repo(User).firstWhere({ email: model.email })
    if (!user) return undefined

    const oneWeek = 60 * 60 * 24 * 7
    const access = await redis.repo(AccessToken).createAndSave({
      user_id: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    })
    await access.expire(oneWeek)
    this.res.cookie("token", access.token, {
      sameSite: "none",
      maxAge: oneWeek,
    })

    return true
  }

  async confirm(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      confirmation_token: token,
    })

    if (!model) return undefined
    if (model.revoked_at) return undefined
    if (model.verified_at) return undefined
    if (model.confirmed_at) return undefined

    model.confirmed_at = Date.now()
    await model.save()

    await this.res.redirect("/notifications/login-email-confirmation-success")
  }

  async revoke(token: string): Promise<undefined> {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
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
