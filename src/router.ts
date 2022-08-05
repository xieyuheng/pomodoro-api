import { AccessTokenController } from "./controllers/AccessTokenController"
import { WelcomeController } from "./controllers/WelcomeController"
import { Router } from "./framework/routing/Router"

export const router = new Router()

router.use("*", AccessTokenController, "auth")
router.get("/", WelcomeController, "welcome")

router._router.use((req, res) => {
  res.status(404).json({
    status: {
      code: 404,
      message: "Resource not found",
    },
  })
})
