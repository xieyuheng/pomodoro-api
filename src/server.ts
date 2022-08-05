import { Server } from "./framework/http/Server"
import { WelcomeController } from "./controllers/WelcomeController"

export const server = new Server()

// server.route("GET /", WelcomeController, "welcome")

server.router.get("/", (req, res) => {
  res.json({
    message: "Hi!",
  })
})

server.router.use((req, res) => {
  res.status(404).json({
    status: {
      code: 404,
      message: "Resource not found",
    },
  })
})
