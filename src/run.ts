import { Server } from "./server"
import { Router } from "express"

export async function run(): Promise<void> {
  const router = Router()
  const server = new Server({ router })

  await server.run({
    port: Number(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
}
