import { makeAutoObservable } from "mobx"
import colors from "tailwindcss/colors"

export class Theme {
  constructor(public name: string = "red") {
    makeAutoObservable(this)
  }

  get color(): string {
    return (colors as any)[this.name][400]
  }
}
