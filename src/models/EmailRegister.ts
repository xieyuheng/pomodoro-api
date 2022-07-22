import { Entity, Schema } from "redis-om"
import { client, connect } from "../lib/redis"

export type EmailRegisterJson = {
  username: string
  name: string
  email: string
  verification_token: string
  confirmation_token: string
  confirmation_code: string
}

export interface EmailRegister extends EmailRegisterJson {}

export class EmailRegister extends Entity {
  static schema = new Schema(EmailRegister, {
    username: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    verification_token: { type: "string" },
    confirmation_token: { type: "string" },
    confirmation_code: { type: "string" },
  })

  static async create(json: EmailRegisterJson): Promise<EmailRegister> {
    await connect()
    const repository = client.fetchRepository(EmailRegister.schema)
    return await repository.createAndSave(json)
  }
}
