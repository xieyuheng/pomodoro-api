import { Redis } from "../framework/database/Redis"
import { Controller } from "../framework/routing/Controller"
import { AccessToken } from "../models/AccessToken"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class AccessTokenController extends Controller {
  async auth(): Promise<void> {
    const app = await useApp()
    const redis = app.create(Redis)

    const token = this.req.cookies.token
    if (!token) return this.next()

    const access = await redis.repo(AccessToken).firstWhere({ token })
    if (!access) return this.next()

    const user = await redis.repo(User).find(access.user_id)
    if (!user) return this.next()

    return this.next()

    this.router.express.set("auth", { user })
  }
}
