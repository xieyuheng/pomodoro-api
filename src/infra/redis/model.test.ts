import { describe, expect, test } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"
import ty, { Schema, Schemas } from "@xieyuheng/ty"

export type UserJson = {
  username: string
  name: string
  email: string
  address?: string
}

export function createUserSchema(): Schemas.ObjectSchema<UserJson> {
  return ty.object({
    username: ty.string(),
    name: ty.string(),
    email: ty.string(),
    address: ty.optional(ty.string()),
  })
}

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = createUserSchema()

  sayHi() {
    console.log(`Hi~, I am ${this.name}.`)
  }
}

describe("redis model", async () => {
  const redis = new Redis({
    client: {
      url: "redis://127.0.0.1:6379",
    },
  })

  await redis.client.connect()

  test("User", async () => {
    const user = redis.repository(User).create({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
    })

    expect(user.json()).toEqual({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
    })

    user.email = "hello@xieyuheng.com"
    user.address = "nowhere"

    expect(user.json()).toEqual({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hello@xieyuheng.com",
      address: "nowhere",
    })

    await user.save()

    await redis.client.EXPIRE(user._key, 10)
  })
})
