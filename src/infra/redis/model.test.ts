import { test } from "vitest"
import { Model } from "./Model"
import { Redis } from "./Redis"

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {}
export class User extends Model<UserJson> {
  field: number = 1

  get getter(): string {
    return "hi"
  }

  method() {
    console.log("hi~")
  }
}

async function play() {
  const redis = new Redis({
    url: "redis://127.0.0.1:6379",
  })

  const user = redis.repository(User).create({
    username: "xieyuheng",
    name: "Xie Yuheng",
    email: "",
  })

  console.log(user.name)
}

test("h", async () => {
  await play()

  // expect(h("question", { color: "red" }, ["Why?"])).toEqual({
  //   tag: "question",
  //   attributes: { color: "red" },
  //   children: ["Why?"],
  // })
})
