import cookieParser from "cookie-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import { Controller, ControllerConstructor } from "./Controller"

export type Handler = (req: Request, res: Response, next: NextFunction) => void

export class Router {
  express = express()

  constructor() {
    this.express.use(express.json())
    this.express.use(cookieParser())
    this.express.use(cors())
  }

  post<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.post(path, this.createHandler(clazz, name))
  }

  get<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.get(path, this.createHandler(clazz, name))
  }

  patch<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.patch(path, this.createHandler(clazz, name))
  }

  put<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.put(path, this.createHandler(clazz, name))
  }

  delete<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.delete(path, this.createHandler(clazz, name))
  }

  head<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.head(path, this.createHandler(clazz, name))
  }

  use<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ) {
    this.express.use(path, this.createHandler(clazz, name))
  }

  createHandler<TController extends Controller>(
    clazz: ControllerConstructor<TController>,
    name: keyof TController
  ): Handler {
    return async (req, res, next) => {
      const t0 = Date.now()
      const who = `${clazz.name}.${name.toString()}`

      try {
        const controller = new clazz({ req, res, next, router: this })
        const action = controller[name] as unknown as Function
        const args = Object.values(req.params)
        const result = await action.bind(controller)(...args)
        if (result === null || result === undefined) {
          // NOTE success, but no content to return
          res.status(204)
          res.end()
        } else {
          const t1 = Date.now()
          const elapse = t1 - t0
          console.log({ who, elapse })
          if (typeof result === "string") {
            res.send(result)
          } else {
            res.json(result)
          }
        }
      } catch (error) {
        const t1 = Date.now()
        const elapse = t1 - t0
        console.error({ who, elapse })
        next(error)
      }
    }
  }
}
