import express, { Router } from "express"
import { Server } from "./framework/http/Server"
import cors from "cors"

export async function run(): Promise<void> {
  const router = Router()
  const server = new Server({ router })

  router.use(cors())
  router.use(express.json())

  router.get("*", (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate")
    res.end("Hello world!")
  })

  router.use((req, res) => {
    res.status(404).json({
      status: { code: 404, message: "Resource not found" },
    })
  })

  await server.run({
    port: Number(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
}

run().catch(console.error)
