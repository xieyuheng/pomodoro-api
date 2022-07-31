import { isServer } from "@/framework/utils/isServer"

type Values = Record<string, string>

export function useForm(values: Values): Form {
  const form = new Form(values)

  if (isServer()) return form

  return reactive(form)
}

export class Form {
  processing = false
  // errors: Values =

  constructor(public values: Values) {}

  async postByEvent(event: any, url: string, options?: Record<string, any>) {
    const target = event.target
    for (const key of Object.keys(this.values)) {
      this.values[key] = target[key].value
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
