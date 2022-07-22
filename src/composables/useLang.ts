import { Lang } from "../states/Lang"

function createLang() {
  const tag = localStorage.getItem("Lang")
  return new Lang(tag || "en")
}

export const useLang = () => useState<Lang>("lang", () => createLang())

// autorun(() => localStorage.setItem("Lang", lang.tag))
