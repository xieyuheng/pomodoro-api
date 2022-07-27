import { describe, expect, test } from "vitest"
import { Redis } from "./Redis"

describe("play with redis", async () => {
  const redis = new Redis({
    client: {
      url: "redis://127.0.0.1:6379",
    },
  })

  await redis.client.connect()

  const { client } = redis

  test("string", async () => {
    // GET an empty key will return null.
    await client.DEL("hi")
    expect(await client.GET("hi")).toBe(null)

    await client.SET("hello", "hi")
    expect(await client.GET("hello")).toBe("hi")

    await client.SET("hello", "bye")
    expect(await client.GET("hello")).toBe("bye")

    await client.EXPIRE("hello", 10)
  })

  test("number", async () => {
    await client.SET("count", "not a number")
    await expect(() => client.INCR("count")).rejects.toThrow()

    expect(await client.EXISTS("count")).toBe(1)
    await client.DEL("count")
    expect(await client.EXISTS("count")).toBe(0)

    // Create reasonable value on write.
    expect(await client.DECR("count")).toBe(-1)
    expect(await client.INCRBY("count", 10)).toBe(9)
    expect(await client.INCRBY("count", 10)).toBe(19)

    // GET only returns string.
    await client.SET("count", 100)
    expect(await client.GET("count")).toBe("100")

    await client.EXPIRE("count", 10)
  })

  test("hash", async () => {
    await client.sendCommand([
      "HSET",
      "Player:42",
      ...redis.formatHash({
        name: "Mimor",
        race: "Elf",
        level: "4",
        hp: "20",
        gold: "20",
      }),
    ])

    expect(await client.HGETALL("Player:42")).toEqual({
      name: "Mimor",
      race: "Elf",
      level: "4",
      hp: "20",
      gold: "20",
    })

    await client.sendCommand([
      "HSET",
      "Player:42",
      ...redis.formatHash({
        status: "dazed",
      }),
    ])

    expect(await client.HGETALL("Player:42")).toEqual({
      name: "Mimor",
      race: "Elf",
      level: "4",
      hp: "20",
      gold: "20",
      status: "dazed",
    })

    await client.sendCommand(["HDEL", "Player:42", "status"])

    expect(await client.HGETALL("Player:42")).toEqual({
      name: "Mimor",
      race: "Elf",
      level: "4",
      hp: "20",
      gold: "20",
    })

    expect(await client.HGET("Player:42", "level")).toBe("4")
    expect(await client.HGET("Player:42", "status")).toBe(null)

    await client.HINCRBY("Player:42", "gold", 40)
    expect(await client.HGET("Player:42", "gold")).toBe("60")

    await client.EXPIRE("Player:42", 10)
  })

  test("list", async () => {
    //
  })

  test("set", async () => {
    //
  })

  test("sorted set", async () => {
    //
  })
})
