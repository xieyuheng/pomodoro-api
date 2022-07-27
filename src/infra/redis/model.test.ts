import { describe, expect, test } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"
import ty from "@xieyuheng/ty"

export type UserJson = {
  username: string
  name: string
  email: string
  address?: string
}

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = ty.object({
    username: ty.string(),
    name: ty.string(),
    email: ty.string(),
    address: ty.optional(ty.string()),
  })

  sayHi() {
    console.log(`Hi~, I am ${this.name}.`)
    console.log(`class name: ${this.repository.clazz.name}.`)
  }
}

describe("redis", async () => {
  const redis = new Redis({
    client: {
      url: "redis://127.0.0.1:6379",
    },
  })

  await redis.client.connect()

  test("redis core", async () => {
    await redis.client.set("key", "value")
    const value = await redis.client.get("key")
    expect(value).toBe("value")
  })

  test("User Model", async () => {
    const user = redis.repository(User).create({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
    })

    console.log(user.json())
    user.email = "hello@xieyuheng.com"
    user.address = "nowhere"
    console.log(user.json())

    await user.save()
    user.sayHi()
  })
})
