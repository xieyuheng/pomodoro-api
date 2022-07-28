import { Redis } from "@/framework/database/Redis"
import { Coupler, Provider } from "@xieyuheng/coupler"
import { config } from "../../config"
import { EmailRegister } from "../../server/models/EmailRegister"

export class RedisProvider extends Provider {
  async register(app: Coupler) {
    app.singleton(Redis, (app) => {
      return new Redis({
        client: {
          url: config.redis.url,
        },
      })
    })
  }

  async boot(app: Coupler) {
    const redis = app.create(Redis)
    await redis.client.connect()

    await redis.repository(EmailRegister).createIndex({
      confirmation_token: "text",
      verification_token: "text",
    })
  }
}
