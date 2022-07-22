import { Lang } from "../states/Lang"

function createLang() {
  // const tag = localStorage.getItem("Lang")
  // return new Lang(tag || "en")
  return new Lang("en")
}

export const lang = createLang()

// autorun(() => localStorage.setItem("Lang", lang.tag))
