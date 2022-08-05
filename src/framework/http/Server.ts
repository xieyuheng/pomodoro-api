import cors from "cors"
import express, { NextFunction, Request, Response, Router } from "express"
import { Controller, ControllerConstructor } from "../routing/Controller"

export type Handler = (req: Request, res: Response, next: NextFunction) => void

export class Server {
  router = Router()
  express = express()

  constructor() {
    this.router.use(cors())
    this.router.use(express.json())
  }

  route<TController extends Controller>(
    endpoint: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    const handler: Handler = async (req, res, next) => {
      const controller = new clazz(req, res)
      const action = controller[actionName]

      const t0 = Date.now()
      const who = `${clazz.name}.${actionName.toString()}`

      try {
        const result = await (action as any)()
        if (result === null || result === undefined) {
          // NOTE success, but no content to return
          res.status(204)
          res.end()
        } else {
          const t1 = Date.now()
          const elapse = t1 - t0
          console.log({ who, elapse })
          res.json(result)
        }
      } catch (error) {
        // NOTE According to: https://expressjs.com/en/guide/error-handling.html
        if (res.headersSent) return next(error)
        const t1 = Date.now()
        const elapse = t1 - t0
        console.error({ who, elapse })
      }
    }

    const { method, path } = this.parseEndpoint(endpoint)
    const router = this.router as any
    router[method](path, handler)
  }

  private parseEndpoint(endpoint: string): { method: string; path: string } {
    const parts = endpoint.split(" ")
    const method = parts[0].toLowerCase()
    const path = parts.slice(1).join(" ")
    return { method, path }
  }

  async run(opts: { port: number; host: string }): Promise<void> {
    const { port, host } = opts

    this.express.use(this.router).disable("x-powered-by").listen({ port, host })

    console.log({ who: "Server.run", host, port })
  }
}
