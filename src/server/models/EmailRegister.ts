import { Entity, Schema } from "redis-om"
import { client } from "../../lib/redis"

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
      verification_token: { type: "string", indexed: true },
      confirmation_token: { type: "string", indexed: true },
      confirmation_code: { type: "string" },
      confirmed_at: { type: "date" },
      verified_at: { type: "date" },
      revoked_at: { type: "date" },
    },
    {
      prefix: "EmailRegister",
    }
  )

  static get repository() {
    return client.fetchRepository(EmailRegister.schema)
  }

  static async getByToken(token: string): Promise<EmailRegister | null> {
    return this.repository
      .search()
      .where("confirmation_token")
      .equals(token)
      .or("verification_token")
      .equals(token)
      .return.first()
  }

  get repository() {
    return client.fetchRepository(EmailRegister.schema)
  }

  async save(): Promise<string> {
    return await this.repository.save(this)
  }

  async delete(): Promise<void> {
    await this.repository.remove(this.entityId)
  }

  async expireInSeconds(s: number): Promise<void> {
    await this.repository.expire(this.entityId, s)
  }
}
