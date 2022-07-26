import { Entity, Schema } from "redis-om"
import { client, connect } from "../lib/redis"

export type EmailRegisterJson = {
  username: string
  name: string
  email: string
  verification_token: string
  confirmation_token: string
  confirmation_code: string
  confirmed_at?: number
  verified_at?: number
  revoked_at?: number
}

export interface EmailRegister extends EmailRegisterJson {}

export class EmailRegister extends Entity {
  static schema = new Schema(
    EmailRegister,
    {
      username: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      verification_token: { type: "string" },
      confirmation_token: { type: "string" },
      confirmation_code: { type: "string" },
      confirmed_at: { type: "number" },
      verified_at: { type: "number" },
      revoked_at: { type: "number" },
    },
    {
      prefix: "EmailRegister",
    }
  )

  static async create(json: EmailRegisterJson): Promise<EmailRegister> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    const entity = await repository.createEntity(json)
    await repository.save(entity)
    return entity
  }

  static async put(entity: EmailRegister): Promise<string> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    const id = await repository.save(entity)
    return id
  }

  static async get(id: string): Promise<EmailRegister> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    const entity = await repository.fetch(id)
    return entity
  }

  static async has(id: string): Promise<boolean> {
    await connect()
    const flag = await client.execute(["EXISTS", `${this.schema.prefix}:${id}`])
    return Boolean(flag)
  }

  static async delete(id: string): Promise<void> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    await repository.remove(id)
  }

  static async expireInSeconds(id: string, s: number): Promise<void> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    await repository.expire(id, s)
  }
}
