import { BaseController } from "./BaseController"

export class WelcomeController extends BaseController {
  async welcome() {
    return {
      message: "Welcome to use Pomodoro API.",
    }
  }
}
