import { isServer } from "@/framework/utils/isServer"

type Values = Record<string, string>

export function useForm<T extends Values>(values: T) {
  const form = new Form(values)
  return isServer() ? form : reactive(form)
}

export class Form<T extends Values> {
  processing = false
  errors: Partial<T> = {}

  constructor(public values: T) {}

  async postByEvent(event: Event, url: string, options?: Record<string, any>) {
    const target: any = event.target
    for (const key of Object.keys(this.values)) {
      ;(this.values as any)[key] = target[key].value
    }

    return await this.post(url, options)
  }

  async post(url: string, options?: Record<string, any>) {
    this.processing = true

    const result = await $fetch(url, {
      method: "POST",
      ...options,
      body: this.values,
    })

    this.processing = false

    return result
  }
}
