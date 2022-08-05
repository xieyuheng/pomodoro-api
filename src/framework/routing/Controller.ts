import { NextFunction, Request, Response } from "express"
import { Router } from "./Router"

export interface ControllerOptions {
  req: Request
  res: Response
  next: NextFunction
  router: Router
}

export type ControllerConstructor<TController> = new (
  options: ControllerOptions
) => TController

export interface Controller extends ControllerOptions {}

export class Controller {
  constructor(options: ControllerOptions) {
    Object.assign(this, options)
  }
}
