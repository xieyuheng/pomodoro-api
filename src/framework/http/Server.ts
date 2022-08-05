import { Router, RouterOptions } from "../routing/Router"

interface ServerOptions {
  router: RouterOptions
}

export class Server {
  router: Router

  constructor(public options: ServerOptions) {
    this.router = new Router(options.router)
  }

  async run(options: { port: number; host: string }): Promise<void> {
    const { port, host } = options

    this.router.express.disable("x-powered-by").listen({ port, host })

    console.log({
      who: "Server.run",
      host,
      port,
    })
  }
}
