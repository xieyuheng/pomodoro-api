import { Coupler, Provider } from "@xieyuheng/coupler"
import { connect } from "../../lib/redis"

export class RedisProvider extends Provider {
  async register(app: Coupler) {}

  async boot(app: Coupler) {
    await connect()
  }
}
