import { ty } from "@xieyuheng/ty"
import { BaseController } from "./BaseController"
import { EmailLogin } from "../models/EmailLogin"
import { User } from "../models/User"
import { Pomodoro } from "../models/Pomodoro"
import { TaskSchema } from "../jsons/TaskJson"
import { useApp } from "../useApp"
import { Redis } from "../framework/database/Redis"

export class PomodoroController extends BaseController {
  async put() {
    const auth = await this.auth()
    if (!auth.user) {
      this.res.status(404).end()
      return
    }

    const scheme = ty.object({ tasks: ty.array(TaskSchema) })
    const json = scheme.validate(this.req.body)

    const app = await useApp()
    const redis = app.create(Redis)

    const pomodoro =
      (await redis.repo(Pomodoro).firstWhere({
        username: auth.user.username,
      })) ||
      (await redis.repo(Pomodoro).createAndSave({
        username: auth.user.username,
        tasks: [],
      }))

    pomodoro.tasks = json.tasks
    await pomodoro.save()
  }

  async get() {
    const auth = await this.auth()
    if (!auth.user) {
      this.res.status(404).end()
      return
    }

    const app = await useApp()
    const redis = app.create(Redis)

    const pomodoro = await redis.repo(Pomodoro).firstWhere({
      username: auth.user.username,
    })

    if (!pomodoro) {
      this.res.status(404).end()
      return
    }

    return pomodoro.json()
  }
}
