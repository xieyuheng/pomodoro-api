import { Client } from "redis-om"
import { config } from "../config"

export const client = new Client()

export async function connect() {
  if (client.isOpen()) return

  await client.open(config.redis.url)
}
