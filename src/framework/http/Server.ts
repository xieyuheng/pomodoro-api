import express, { Router } from "express"
import cors from "cors"

export class Server {
  router = Router()
  express = express()

  constructor() {

    this.router.use(cors())
    this.router.use(express.json())
  }

  async run(opts: { port: number; host: string }): Promise<void> {
    const { port, host } = opts

    this.express
      .use(this.router)
      .disable("x-powered-by")
      .listen({ port, host })

    console.log({ who: "Server.run", host, port })
  }
}
