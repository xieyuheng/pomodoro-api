import { CookieSerializeOptions } from "cookie"
import {
  CompatibilityEvent,
  sendRedirect,
  setCookie,
  useBody,
  useCookie,
} from "h3"

export class Controller {
  constructor(public event: CompatibilityEvent) {}

  get req() {
    return this.event.req
  }

  get res() {
    return this.event.res
  }

  async body() {
    return await useBody(this.req)
  }

  async redirect(location: string) {
    return await sendRedirect(this.event, location)
  }

  setCookie(name: string, value: string, options?: CookieSerializeOptions) {
    setCookie(this.event, name, value, options)
  }

  cookie(name: string) {
    return useCookie(this.event, name)
  }
}
