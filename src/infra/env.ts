export function env(name: string, defaultValue: string = ''): string {
  const env = typeof window === "undefined" ? process.env : import.meta.env
  const value = env[name] || defaultValue
  return String(value)
}

export type Env = typeof env
