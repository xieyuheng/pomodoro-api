import cookieParser from "cookie-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import invariant from "tiny-invariant"
import { FunctionKeys } from "utility-types"
import { Controller, ControllerConstructor } from "./Controller"

type Handler = (req: Request, res: Response, next: NextFunction) => void

export interface RouterOptions {
  cors?: Parameters<typeof cors>[0]
}

export class Router {
  express = express()

  constructor(options: RouterOptions) {
    this.express.use(cors(options.cors))
    this.express.use(cookieParser())
    this.express.use(express.json())
  }

  all<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.all(path, this.createHandler(clazz, name))
  }

  post<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.post(path, this.createHandler(clazz, name))
  }

  get<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.get(path, this.createHandler(clazz, name))
  }

  patch<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.patch(path, this.createHandler(clazz, name))
  }

  put<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.put(path, this.createHandler(clazz, name))
  }

  delete<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.delete(path, this.createHandler(clazz, name))
  }

  head<TController extends Controller>(
    path: string,
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ) {
    this.express.head(path, this.createHandler(clazz, name))
  }

  createHandler<TController extends Controller>(
    clazz: ControllerConstructor<TController>,
    name: FunctionKeys<TController>
  ): Handler {
    return async (req, res, next) => {
      const controller = new clazz({ req, res, next, router: this })
      const action = controller[name]
      invariant(
        action instanceof Function,
        `Action should be a function ${name.toString()}`
      )

      const t0 = Date.now()
      const who = `${clazz.name}.${name.toString()}`

      try {
        const args = Object.values(req.params)
        const result = await action.bind(controller)(...args)
        const t1 = Date.now()
        const elapse = t1 - t0
        console.log({ who, elapse, path: req.path })
        if (result instanceof Function) {
          result()
        } else if (isJson(result)) {
          res.json(result)
        } else {
          if (!res.headersSent) next()
        }
      } catch (error) {
        const t1 = Date.now()
        const elapse = t1 - t0
        console.error({ who, elapse, path: req.path })
        next(error)
      }
    }
  }
}

function isJson(value: any): boolean {
  return isAtom(value) || isAtom(value) || isObject(value)
}

function isAtom(value: any): boolean {
  return (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
}

function isArray(value: any): boolean {
  return value instanceof Array
}

function isObject(value: any): boolean {
  return (
    value !== null && typeof value === "object" && value.constructor === Object
  )
}
