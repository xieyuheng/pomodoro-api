import { Router } from "../routing/Router"

export class Server {
  constructor(public router: Router) {}

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
