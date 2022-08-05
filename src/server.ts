import { Server } from "./framework/http/Server"

export const server = new Server()

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
