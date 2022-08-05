import { NextFunction, Request, Response } from "express"

export type ControllerConstructor<TController> = new (
  req: Request,
  res: Response,
  next: NextFunction
) => TController

export class Controller {
  constructor(
    public req: Request,
    public res: Response,
    public next: NextFunction
  ) {}
}
