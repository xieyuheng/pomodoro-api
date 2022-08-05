import { CookieSerializeOptions } from "cookie"
import { Request, Response } from "express"

export type ControllerConstructor<TController> = new (
  req: Request,
  res: Response
) => TController

export class Controller {
  constructor(public req: Request, public res: Response) {}

  body() {
    return JSON.stringify(this.req.body)
  }

  async redirect(location: string) {
    // return await sendRedirect(this.event, location)
    throw new Error("TODO")
  }

  setCookie(name: string, value: string, options?: CookieSerializeOptions) {
    // setCookie(this.event, name, value, options)
    throw new Error("TODO")
  }

  cookie(name: string) {
    // return useCookie(this.event, name)
    throw new Error("TODO")
  }
}
