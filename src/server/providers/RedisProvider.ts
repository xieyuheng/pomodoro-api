import { Redis } from "@/framework/database/Redis"
import { Coupler, Provider } from "@xieyuheng/coupler"
import { config } from "../../config"
import { AccessToken } from "../../server/models/AccessToken"
import { EmailRegister } from "../../server/models/EmailRegister"
import { User } from "../../server/models/User"

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
      confirmation_token: "tag casesensitive",
      verification_token: "tag casesensitive",
    })

    await redis.repository(User).createIndex({
      username: "tag casesensitive",
      name: "tag casesensitive",
      email: "tag casesensitive",
    })

    await redis.repository(AccessToken).createIndex({
      user_id: "tag casesensitive",
      token: "tag casesensitive",
    })
  }
}
