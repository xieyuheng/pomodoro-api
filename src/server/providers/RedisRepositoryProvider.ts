import { Coupler, Provider } from "@xieyuheng/coupler"
import { client, connect } from "../../lib/redis"
import { EmailRegister } from "../../server/models/EmailRegister"
import { User } from "../../server/models/User"

export class RedisRepositoryProvider extends Provider {
  async register(app: Coupler) {}

  async boot(app: Coupler) {
    await connect()
    await client.fetchRepository(User.schema).createIndex()
    await client.fetchRepository(EmailRegister.schema).createIndex()
  }
}
