import { BaseController } from "./BaseController"

export class UserController extends BaseController {
  async current() {
    return this.currentUser()
  }
}
