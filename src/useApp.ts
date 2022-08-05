import { App } from "./App"

let cache: App | null = null

export async function useApp(): Promise<App> {
  if (cache) return cache

  const app = await App.create()
  cache = app
  return app
}
