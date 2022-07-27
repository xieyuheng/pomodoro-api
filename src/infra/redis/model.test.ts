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

    console.log(user.json())
    user.email = "hello@xieyuheng.com"
    user.address = "nowhere"
    console.log(user.json())

    await user.save()
    user.sayHi()

    await redis.client.EXPIRE(user._key, 10)
  })

  test("User many many many", async () => {
    let count = 1000
    while (count-- > 0) {
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

      await redis.client.EXPIRE(user._key, 10)
    }
  })
})
