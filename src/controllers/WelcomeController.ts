import { Controller } from "../framework/routing/Controller"

export class WelcomeController extends Controller {
  version = 1

  async welcome() {
    return {
      message: "Welcome to use Pomodoro API.",
    }
  }
}
