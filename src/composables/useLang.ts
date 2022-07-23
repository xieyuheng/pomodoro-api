import { reactive } from "vue"
import { Lang } from "../states/Lang"

let lang = new Lang("en")
let initialized = false

export function useLang() {
  if (initialized) return lang
  if (typeof window === "undefined") return lang

  // const tag = localStorage.getItem("Lang")
  // return new Lang(tag || "en")
  lang = reactive(lang)

  return lang
}

// autorun(() => localStorage.setItem("Lang", lang.tag))
