import { Entity, Schema } from "redis-om"
import { client } from "../lib/redis"

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

  static async repository() {
    const repository = client.fetchRepository(EmailRegister.schema)
    await repository.createIndex()
    return repository
  }

  static async create(json: EmailRegisterJson): Promise<EmailRegister> {
    const repository = await this.repository()
    const entity = await repository.createEntity(json)
    await repository.save(entity)
    return entity
  }

  static async put(entity: EmailRegister): Promise<string> {
    const repository = await this.repository()
    const id = await repository.save(entity)
    return id
  }

  static async get(id: string): Promise<EmailRegister | null> {
    const repository = await this.repository()
    const entity = await repository.fetch(id)
    return entity
  }

  static async has(id: string): Promise<boolean> {
    const flag = await client.execute(["EXISTS", `${this.schema.prefix}:${id}`])
    return Boolean(flag)
  }

  static async delete(id: string): Promise<void> {
    const repository = await this.repository()
    await repository.remove(id)
  }

  static async expireInSeconds(id: string, s: number): Promise<void> {
    const repository = await this.repository()
    await repository.expire(id, s)
  }

  // domain as repository

  static async getByToken(token: string): Promise<EmailRegister | null> {
    const repository = await this.repository()
    return repository
      .search()
      .where("confirmation_token")
      .equals(token)
      .or("verification_token")
      .equals(token)
      .return.first()
  }

  // active record

  async repository() {
    const repository = client.fetchRepository(EmailRegister.schema)
    await repository.createIndex()
    return repository
  }

  async save(): Promise<string> {
    const repository = await this.repository()
    const id = await repository.save(this)
    return id
  }

  async delete(): Promise<void> {
    const repository = await this.repository()
    await repository.remove(this.id)
  }

  async expireInSeconds(s: number): Promise<void> {
    const repository = await this.repository()
    await repository.expire(this.id, s)
  }
}
