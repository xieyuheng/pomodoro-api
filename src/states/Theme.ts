import { tailwindConfig } from "../lib/tailwind"

export class Theme {
  constructor(public name: string = "red") {}

  get color(): string {
    return tailwindConfig.theme.colors[this.name][400]
  }
}
