import ty from "@xieyuheng/ty"
import { describe, expect, test } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"

export type UserJson = {
  username: string
  name: string
  email: string
  address?: {
    country: string
    city: string
  }
}

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = ty.object({
    username: ty.string(),
    name: ty.string(),
    email: ty.string(),
    address: ty.optional(
      ty.object({
        country: ty.string(),
        city: ty.string(),
      })
    ),
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

  test("crate and update", async () => {
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
    user.address = {
      country: "China",
      city: "Shenzhen",
    }

    expect(user.json()).toEqual({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hello@xieyuheng.com",
      address: {
        country: "China",
        city: "Shenzhen",
      },
    })

    await user.save()

    {
      const found = await redis.repository(User).get(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found.json()).toEqual(user.json())
    }

    {
      await redis.repository(User).update(user.id, {
        address: {
          city: "Yinchuan",
        },
      })
      const found = await redis.repository(User).get(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found.address).toEqual({
        country: "China",
        city: "Yinchuan",
      })
    }

    await user.expire(10)
  })

  test("exists and delete", async () => {
    const user = redis.repository(User).create({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
    })

    expect(await redis.repository(User).exists(user.id)).toBe(false)
    await user.save()
    expect(await redis.repository(User).exists(user.id)).toBe(true)
    await redis.repository(User).delete(user.id)
    expect(await redis.repository(User).exists(user.id)).toBe(false)
  })
})
