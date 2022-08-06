import { Redis } from "../framework/database/Redis"
import { Controller } from "../framework/routing/Controller"
import { AccessToken } from "../models/AccessToken"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class BaseController extends Controller {
  async currentUser() {
    const app = await useApp()
    const redis = app.create(Redis)

    const token = this.req.cookies.token
    if (!token) {
      this.res.status(404).end()
      return
    }

    const access = await redis.repo(AccessToken).firstWhere({ token })
    if (!access) {
      this.res.status(404).end()
      return
    }

    const user = await redis.repo(User).find(access.user_id)
    if (!user) {
      this.res.status(404).end()
      return
    }

    return user
  }
}
