import { Controller } from "@/framework/routing/Controller"
import { User } from "../models/User"

export class UserController extends Controller {
  async current(): Promise<User | null> {
    console.log({
      who: "UserController.current",
      auth: this.event.context.auth,
    })

    return this.event.context.auth ? this.event.context.auth.user : null
  }
}
