import { Controller } from "../framework/routing/Controller"

export class WelcomeController extends Controller {
  async welcome() {
    return this.req.headers
  }
}
