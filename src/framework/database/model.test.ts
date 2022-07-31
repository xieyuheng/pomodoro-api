import { Obtain, ty } from "@xieyuheng/ty"
import { describe, expect, test } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"

export const UserSchema = ty.object({
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

export type UserJson = Obtain<typeof UserSchema>

export interface User extends UserJson {}

export class User extends Model<UserJson> {
  schema = UserSchema

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

  await redis.repo(User).createIndex({
    name: "tag casesensitive",
    username: "tag casesensitive",
    email: "tag casesensitive",
    address: {
      country: "tag casesensitive",
      city: "tag casesensitive",
    },
  })

  test("crate and update", async () => {
    const user = redis.repo(User).create({
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
      const found = await redis.repo(User).find(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found?.json()).toEqual(user.json())
    }

    {
      await redis.repo(User).update(user.id, {
        address: {
          city: "Yinchuan",
        },
      })
      const found = await redis.repo(User).find(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found?.address).toEqual({
        country: "China",
        city: "Yinchuan",
      })
    }

    await user.delete()
  })

  test("exists and delete", async () => {
    const user = redis.repo(User).create({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
    })

    expect(await redis.repo(User).exists(user.id)).toBe(false)
    await user.save()
    expect(await redis.repo(User).exists(user.id)).toBe(true)
    await redis.repo(User).delete(user.id)
    expect(await redis.repo(User).exists(user.id)).toBe(false)
  })

  test("query", async () => {
    const user1 = redis.repo(User).create({
      username: "xieyuheng",
      name: "Xie Yuheng",
      email: "hi@xieyuheng.com",
      address: {
        country: "China",
        city: "Yinchuan",
      },
    })

    await user1.save()

    const user2 = redis.repo(User).create({
      username: "yuhengxie",
      name: "Yu Hengxie ",
      email: "hello@xieyuheng.com",
      address: {
        country: "China",
        city: "Shenzhen",
      },
    })

    await user2.save()

    {
      const found = await redis.repo(User).allWhere({ username: "xieyuheng" })

      expect(found[0]?.json()).toEqual(user1.json())
      expect(found[0]?.id).toEqual(user1.id)
    }

    {
      const found = await redis
        .repo(User)
        .allWhere({ address: { city: "Yinchuan" } })

      expect(found[0]?.json()).toEqual(user1.json())
      expect(found[0]?.id).toEqual(user1.id)
    }

    {
      const found = await redis
        .repo(User)
        .allWhere({ username: "xieyuheng", address: { city: "Yinchuan" } })

      expect(found[0]?.json()).toEqual(user1.json())
      expect(found[0]?.id).toEqual(user1.id)
    }

    {
      const found = await redis
        .repo(User)
        .allWhere({ email: "hello@xieyuheng.com" })

      expect(found[0]?.json()).toEqual(user2.json())
      expect(found[0]?.id).toEqual(user2.id)
    }

    await user1.delete()
    await user2.delete()
  })
})
