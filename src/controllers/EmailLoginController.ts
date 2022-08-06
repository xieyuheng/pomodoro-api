import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { config } from "../config"
import { Redis } from "../framework/database/Redis"
import { Mailer } from "../framework/mail/Mailer"
import { AccessToken } from "../models/AccessToken"
import { EmailLogin } from "../models/EmailLogin"
import { User } from "../models/User"
import { useApp } from "../useApp"
import { BaseController } from "./BaseController"

export class EmailLoginController extends BaseController {
  async create() {
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

    const confirmation_link = `${config.self_url}/login/${model.confirmation_token}/confirm`

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

  async verify(token: string) {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      verification_token: token,
    })

    if (!model || model.revoked_at || model.verified_at) {
      this.res.status(404).end()
      return
    }

    if (!model.confirmed_at) {
      return false
    }

    model.verified_at = Date.now()
    await model.save()

    const user = await redis.repo(User).firstWhere({ email: model.email })
    if (!user) {
      this.res.status(404).end()
      return
    }

    const oneWeek = 60 * 60 * 24 * 7
    const access = await redis.repo(AccessToken).createAndSave({
      user_id: user.id,
      token: crypto.randomBytes(32).toString("hex"),
    })
    await access.expire(oneWeek)
    this.res.cookie("token", access.token, {
      sameSite: "none",
      secure: true,
      maxAge: oneWeek,
    })

    return true
  }

  async confirm(token: string) {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      confirmation_token: token,
    })

    if (!model || model.revoked_at || model.verified_at || model.confirmed_at) {
      this.res.status(404).end()
      return
    }

    model.confirmed_at = Date.now()
    await model.save()

    this.res.redirect(
      `${config.app_url}/notifications/login-email-confirmation-success`
    )
  }

  async revoke(token: string) {
    const app = await useApp()
    const redis = app.create(Redis)

    const model = await redis.repo(EmailLogin).firstWhere({
      verification_token: token,
    })

    if (!model || model.revoked_at || model.verified_at || model.confirmed_at) {
      this.res.status(404).end()
      return
    }

    model.revoked_at = Date.now()
    await model.save()
  }
}
