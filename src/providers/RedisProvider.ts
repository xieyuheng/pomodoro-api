import { Coupler, Provider } from "@xieyuheng/coupler"
import { config } from "../config"
import { Redis } from "../framework/database/Redis"
import { AccessToken } from "../models/AccessToken"
import { EmailLogin } from "../models/EmailLogin"
import { EmailRegister } from "../models/EmailRegister"
import { User } from "../models/User"
import { Pomodoro } from "../models/Pomodoro"

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

    await redis.repo(EmailRegister).createIndex({
      confirmation_token: "tag casesensitive",
      verification_token: "tag casesensitive",
    })

    await redis.repo(EmailLogin).createIndex({
      confirmation_token: "tag casesensitive",
      verification_token: "tag casesensitive",
    })

    await redis.repo(AccessToken).createIndex({
      user_id: "tag casesensitive",
      token: "tag casesensitive",
    })

    await redis.repo(Pomodoro).createIndex({
      username: "tag casesensitive",
    })
  }
}
