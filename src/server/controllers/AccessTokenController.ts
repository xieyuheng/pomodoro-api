import { Redis } from "@/framework/database/Redis"
import { Controller } from "@/framework/routing/Controller"
import { AccessToken } from "../models/AccessToken"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class AccessTokenController extends Controller {
  async auth(token: string): Promise<null | { user: User }> {
    const app = await useApp()
    const redis = app.create(Redis)

    const accessToken = await redis
      .repository(AccessToken)
      .firstWhere({ token })

    if (!accessToken) return null

    const user = await redis.repository(User).findOrFail(accessToken.user_id)

    return { user }
  }
}
