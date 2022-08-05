import express, { Application, Router } from "express"

export class Server {
  router: Router
  expressApp: Application

  constructor(opts: { router: Router }) {
    this.router = opts.router
    this.expressApp = express()
  }

  async run(opts: { port: number; host: string }): Promise<void> {
    const { port, host } = opts

    this.expressApp
      .use(this.router)
      .disable("x-powered-by")
      .listen({ port, host })

    console.log({ who: "Server.run", host, port })
  }
}
