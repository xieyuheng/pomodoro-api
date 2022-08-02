import { isServer } from "@/framework/utils/isServer"
import { FetchError } from "ohmyfetch"

type Values = Record<string, string>

export function useForm<T extends Values>(values: T) {
  const form = new Form(values)
  return isServer() ? form : reactive(form)
}

interface PostOptions {
  then?: (result: any) => void | Promise<void>
  catch?: (error: unknown) => void | Promise<void>
}

export class Form<T extends Values> {
  processing = false
  error?: FetchError

  constructor(public values: T) {}

  get invalid() {
    return this.error?.data?.invalid
  }

  get code() {
    return this.error?.data?.statusCode
  }

  async postByEvent(event: Event, url: string, options?: PostOptions) {
    const target: any = event.target
    for (const key of Object.keys(this.values)) {
      ;(this.values as any)[key] = target[key].value
    }

    return await this.post(url, options)
  }

  async post(url: string, options?: PostOptions): Promise<void> {
    this.processing = true
    this.error = undefined

    try {
      const result = await $fetch(url, {
        method: "POST",
        body: this.values,
      })
      if (options?.then) {
        options.then(result)
      }
    } catch (error) {
      if (!(error instanceof FetchError)) throw error

      this.error = error
      if (options?.catch) {
        options.catch(error)
      }
    }

    this.processing = false
  }
}
