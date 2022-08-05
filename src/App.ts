import { Coupler } from "@xieyuheng/coupler"
import * as Providers from "./providers"

export class App extends Coupler {
  static async create(): Promise<App> {
    const app = new App()
    await app.bootstrap(
      Object.values(Providers).map((ProviderClass) => new ProviderClass())
    )
    return app
  }
}
