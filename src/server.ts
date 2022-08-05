import { WelcomeController } from "./controllers/WelcomeController"
import { Server } from "./framework/http/Server"

export const server = new Server()

server.route("GET /", WelcomeController, "welcome")

server.router.use((req, res) => {
  res.status(404).json({
    status: {
      code: 404,
      message: "Resource not found",
    },
  })
})
