import { Entity, Schema } from "redis-om"
import { client } from "../../lib/redis"

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {}
export class User extends Entity {
  static schema = new Schema(
    User,
    {
      username: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
    },
    {
      prefix: "User",
    }
  )

  static get repository() {
    return client.fetchRepository(User.schema)
  }

  get repository() {
    return client.fetchRepository(User.schema)
  }

  async save(): Promise<string> {
    return await this.repository.save(this)
  }

  async delete(): Promise<void> {
    await this.repository.remove(this.entityId)
  }
}
