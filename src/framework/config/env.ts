import { config } from "dotenv"

let initialized = false

export function env(name: string, defaultValue: string = ""): string {
  if (!initialized) {
    config()
    initialized = true
  }

  const value = process.env[name] || defaultValue
  return String(value)
}

export type Env = typeof env
