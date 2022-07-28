import { Mailer } from "@/framework/mail/Mailer"
import { Coupler, Provider } from "@xieyuheng/coupler"
import { config } from "../../config"

export class MailerProvider extends Provider {
  async register(app: Coupler): Promise<void> {
    app.singleton(Mailer, (app) => {
      return new Mailer(config.mail)
    })
  }
}
