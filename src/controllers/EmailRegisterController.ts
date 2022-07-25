import ty from "@xieyuheng/ty"
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

  async store(): Promise<Record<string, any>> {
    // const scheme = ty.object({
    //   username: ty.string(),
    //   name: ty.string(),
    //   email: ty.string(),
    // })

    const body = await useBody(this.req)

    const json = {
      // ...scheme.validate(body),
      ...body,
      verification_token: crypto.randomBytes(32).toString("hex"),
      confirmation_token: crypto.randomBytes(32).toString("hex"),
      confirmation_code: crypto.randomBytes(3).toString("hex"),
    }

    const emailRegister = await EmailRegister.create(json)

    return emailRegister.toJSON()
  }

  confirm() {}

  verify() {}

  revoke() {}
}
