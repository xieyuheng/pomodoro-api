import cookieParser from "cookie-parser"
import cors from "cors"
import express, {
  NextFunction,
  Request,
  Response,
  Router as ExpressRouter,
} from "express"
import { Controller, ControllerConstructor } from "./Controller"

export type Handler = (req: Request, res: Response, next: NextFunction) => void

export class Router {
  _router = ExpressRouter()

  constructor() {
    this._router.use(express.json())
    this._router.use(cookieParser())
    this._router.use(cors())
  }

  post<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.post(path, this.createHandler(clazz, actionName))
  }

  get<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.get(path, this.createHandler(clazz, actionName))
  }

  patch<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.patch(path, this.createHandler(clazz, actionName))
  }

  put<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.put(path, this.createHandler(clazz, actionName))
  }

  delete<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.delete(path, this.createHandler(clazz, actionName))
  }

  head<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.head(path, this.createHandler(clazz, actionName))
  }

  use<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ) {
    this._router.use(path, this.createHandler(clazz, actionName))
  }

  createHandler<TController extends Controller>(
    clazz: ControllerConstructor<TController>,
    actionName: keyof TController
  ): Handler {
    return async (req, res, next) => {
      const t0 = Date.now()
      const who = `${clazz.name}.${actionName.toString()}`

      try {
        const controller = new clazz(req, res, next)
        const action = controller[actionName]

        const result = await (action as any).bind(controller)()
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
