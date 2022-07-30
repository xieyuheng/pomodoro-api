import { reactive } from "vue"
import { isServer } from "./isServer"

export function defineAsyncState<T>(createState: () => Promise<T>): {
  use: () => Promise<T>
} {
  let cachedState: T | null = null

  async function use() {
    if (cachedState) return cachedState
    if (isServer()) return await createState()

    const state = reactive<any>(await createState())
    cachedState = state
    return state
  }

  return { use }
}
