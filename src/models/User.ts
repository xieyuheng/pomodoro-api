import { Entity, Schema } from "redis-om"
import { client, connect } from "../lib/redis"

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {}

export class User extends Entity {
  static schema = new Schema(User, {
    username: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
  })

  static async create(json: UserJson): Promise<User> {
    await connect()
    const repository = client.fetchRepository(User.schema)
    return await repository.createAndSave(json)
  }
}
