import { reactive } from "vue"
import { isServer } from "./isServer"

export function defineState<T>(state: T): { use: () => T } {
  let initialized = false

  function use() {
    if (initialized || isServer()) return state

    state = reactive<any>(state)
    initialized = true
    return state
  }

  return { use }
}
