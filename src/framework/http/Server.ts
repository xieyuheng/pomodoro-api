import express from "express"
import { Router } from "../routing/Router"

export class Server {
  express = express()

  constructor(public router: Router) {}

  async run(options: { port: number; host: string }): Promise<void> {
    const { port, host } = options

    this.express
      .use(this.router._router)
      .disable("x-powered-by")
      .listen({ port, host })

    console.log({
      who: "Server.run",
      host,
      port,
    })
  }
}
