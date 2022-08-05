import { Controller } from "../framework/routing/Controller"

export class UserController extends Controller {
  async current() {
    console.log("auth:", this.router.express.get("auth"))
    const user = this.router.express.get("auth")?.user
    if (!user) {
      this.res.status(404).end()
      return
    }

    return user
  }
}
