import { createClient } from "redis"

type Client = ReturnType<typeof createClient>

export class Redis {
  client: Client

  constructor(options: { url?: string }) {
    this.client = createClient(options)
  }
}
