import { CompatibilityEvent, sendRedirect, useBody } from "h3"
import { App } from "./App"

export class Controller {
  constructor(public app: App, public event: CompatibilityEvent) {}

  get req() {
    return this.event.req
  }

  get res() {
    return this.event.res
  }

  async useBody() {
    return await useBody(this.req)
  }

  async sendRedirect(location: string) {
    return await sendRedirect(this.event, location)
  }
}
