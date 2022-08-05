export function env(name: string, defaultValue: string = ""): string {
  const value = process.env[name] || defaultValue
  return String(value)
}

export type Env = typeof env
