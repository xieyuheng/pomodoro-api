import { Coupler, Provider } from "@xieyuheng/coupler"
import { Mailer } from "../../infra/mailer"

function assert(s?: string): string {
  if (s) return s
  throw new Error(`process.env assertion failed`)
}

export class MailerProvider extends Provider {
  async register(app: Coupler): Promise<void> {
    app.singleton(Mailer, (app) => {
      return new Mailer({
        server: {
          smtp: {
            host: assert(process.env.MAIL_HOST),
            port: Number.parseInt(assert(process.env.MAIL_PORT)),
            encryption: assert(process.env.MAIL_ENCRYPTION),
          },
        },
        sender: {
          username: assert(process.env.MAIL_SENDER_USERNAME),
          address: assert(process.env.MAIL_SENDER_ADDRESS),
          password: assert(process.env.MAIL_SENDER_PASSWORD),
        },
      })
    })
  }
}
