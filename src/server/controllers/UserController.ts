import { Controller } from "@/framework/routing/Controller"
import { Redis } from "@/framework/database/Redis"
import { AccessToken } from "../models/AccessToken"
import { User } from "../models/User"
import { useApp } from "../useApp"

export class UserController extends Controller {
  async current(): Promise<User | null> {
    return this.event.context.auth.user
  }
}
