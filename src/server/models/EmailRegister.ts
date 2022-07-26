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

  get id(): string {
    return this.entityId
  }

  // repository

  static get repository() {
    return client.fetchRepository(EmailRegister.schema)
  }

  static async create(json: EmailRegisterJson): Promise<EmailRegister> {
    const entity = await this.repository.createEntity(json)
    await this.repository.save(entity)
    return entity
  }

  static async put(entity: EmailRegister): Promise<string> {
    const id = await this.repository.save(entity)
    return id
  }

  static async get(id: string): Promise<EmailRegister | null> {
    const entity = await this.repository.fetch(id)
    return entity
  }

  static async has(id: string): Promise<boolean> {
    const flag = await client.execute(["EXISTS", `${this.schema.prefix}:${id}`])
    return Boolean(flag)
  }

  static async delete(id: string): Promise<void> {
    await this.repository.remove(id)
  }

  static async expireInSeconds(id: string, s: number): Promise<void> {
    await this.repository.expire(id, s)
  }

  // domain as repository

  static async getByToken(token: string): Promise<EmailRegister | null> {
    return this.repository
      .search()
      .where("confirmation_token")
      .equals(token)
      .or("verification_token")
      .equals(token)
      .return.first()
  }

  // active record

  get repository() {
    return client.fetchRepository(EmailRegister.schema)
  }

  async save(): Promise<string> {
    const id = await this.repository.save(this)
    return id
  }

  async delete(): Promise<void> {
    await this.repository.remove(this.id)
  }

  async expireInSeconds(s: number): Promise<void> {
    await this.repository.expire(this.id, s)
  }
}
