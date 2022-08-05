import express from "express"
import { Server } from "./framework/http/Server"

const server = new Server()

server.router.use(express.json())

server.router.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate")
  res.end("Hi!")
})

server.router.use((req, res) => {
  res.status(404).json({
    status: { code: 404, message: "Resource not found" },
  })
})

server
  .run({
    port: Number(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
  .catch(console.error)
