import { Coupler } from "@xieyuheng/coupler"
import * as Providers from "./providers"

let cache: App | null = null

export class App extends Coupler {
  static async create(): Promise<App> {
    if (cache) return cache

    const app = new App()
    await app.bootstrap(
      Object.values(Providers).map((ProviderClass) => new ProviderClass())
    )
    cache = app
    return app
  }
}
