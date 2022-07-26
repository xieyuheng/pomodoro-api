import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { CompatibilityEvent, sendRedirect, useBody } from "h3"
import { EmailRegister } from "../models/EmailRegister"
import { App } from "../App"

export class EmailRegisterController {
  constructor(public app: App, public event: CompatibilityEvent) {}

  static async create(
    event: CompatibilityEvent
  ): Promise<EmailRegisterController> {
    const app = await App.create()
    const controller = new EmailRegisterController(app, event)
    return controller
  }

  get req() {
    return this.event.req
  }

  get res() {
    return this.event.res
  }

  async store() {
    const scheme = ty.object({
      username: ty.string(),
      name: ty.string(),
      email: ty.string(),
    })

    const body = await useBody(this.req)

    const json = {
      ...scheme.validate(body),
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const entity = await EmailRegister.create(json)

    // TODO Should only return `VerifyingJson`

    console.log("EmailRegister:", entity.toJSON())

    return entity.toJSON()
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

    await sendRedirect(
      this.event,
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
