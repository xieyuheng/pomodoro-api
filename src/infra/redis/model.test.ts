import { describe, test, expect } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {}
export class User extends Model<UserJson> {
  sayHi() {
    console.log(`Hi~, I am ${this.name}.`)
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
      email: "",
    })

    user.sayHi()
  })
})
