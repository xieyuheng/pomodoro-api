import { BaseController } from "./BaseController"

export class UserController extends BaseController {
  async current() {
    const auth = await this.auth()
    if (!auth.user) {
      this.res.status(404).end()
      return
    }

    return auth.user.json()
  }
}
