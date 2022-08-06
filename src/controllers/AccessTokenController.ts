import { Redis } from "../framework/database/Redis"
import { AccessToken } from "../models/AccessToken"
import { User } from "../models/User"
import { useApp } from "../useApp"
import { BaseController } from "./BaseController"

export class AccessTokenController extends BaseController {
  async auth() {
    const app = await useApp()
    const redis = app.create(Redis)

    const token = this.req.cookies.token
    if (!token) return

    const access = await redis.repo(AccessToken).firstWhere({ token })
    if (!access) return

    const user = await redis.repo(User).find(access.user_id)
    if (!user) return

    this.router.express.set("auth", { user })
  }
}
