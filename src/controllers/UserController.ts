import { Controller } from "../framework/routing/Controller"
import { User } from "../models/User"

export class UserController extends Controller {
  async current(): Promise<User | undefined> {
    return undefined
    // return this.event.context.auth?.user
  }
}
