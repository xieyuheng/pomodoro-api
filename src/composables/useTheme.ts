import { reactive } from "vue"
import { Theme } from "../states/Theme"

let theme = new Theme()
let initialized = false

export function useTheme() {
  if (initialized) return theme
  if (typeof window === "undefined") return theme

  theme = reactive(theme)

  return theme
}
