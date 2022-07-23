import { reactive } from "vue"

export function defineState<T>(state: T): { use: () => T } {
  let initialized = false

  function use() {
    if (initialized) return state
    if (typeof window === "undefined") return state

    state = reactive<any>(state)
    initialized = true
    return state
  }

  return { use }
}
