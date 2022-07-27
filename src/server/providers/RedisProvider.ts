import { Coupler, Provider } from "@xieyuheng/coupler"
import { config } from "../../config"
import { Redis } from "../../infra/redis"
import { connect } from "../../lib/redis"

export class RedisProvider extends Provider {
  async register(app: Coupler) {
    app.singleton(Redis, (app) => {
      return new Redis({
        url: config.redis.url,
      })
    })
  }

  async boot(app: Coupler) {
    const redis = app.create(Redis)
    await redis.client.connect()
    await connect()
  }
}
