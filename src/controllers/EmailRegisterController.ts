import { ty } from "@xieyuheng/ty"
import crypto from "crypto"
import { CompatibilityEvent, useBody } from "h3"
import { EmailRegister } from "../models/EmailRegister"

export class EmailRegisterController {
  constructor(public event: CompatibilityEvent) {}

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
    return entity.toJSON()
  }

  async verify(
    token: string
  ): Promise<{ confirmed: true; username: string } | { confirmed: false }> {
    const entity = await EmailRegister.getByToken(token)

    if (entity === null) {
      return { confirmed: false }
    }

    if (entity.revoked_at || entity.verified_at || !entity.confirmed_at) {
      return { confirmed: false }
    }

    entity.verified_at = Date.now()
    await entity.save()

    return { confirmed: true, username: entity.username }
  }

  async confirm(token: string) {}

  async revoke(token: string) {}
}
