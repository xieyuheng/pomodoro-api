import { config } from "./config"
import { LoginController } from "./controllers/LoginController"
import { PomodoroController } from "./controllers/PomodoroController"
import { RegisterController } from "./controllers/RegisterController"
import { UserController } from "./controllers/UserController"
import { WelcomeController } from "./controllers/WelcomeController"
import { Router } from "./framework/routing/Router"

export const router = new Router({
  cors: {
    origin: config.app_url,
    credentials: true,
  },
})

router.get("/", WelcomeController, "welcome")

router.get("/user", UserController, "current")

router.post("/register", RegisterController, "create")
router.get("/register/:token/verify", RegisterController, "verify")
router.get("/register/:token/revoke", RegisterController, "revoke")
router.get("/register/:token/confirm", RegisterController, "confirm")

router.post("/login", LoginController, "create")
router.get("/login/:token/verify", LoginController, "verify")
router.get("/login/:token/revoke", LoginController, "revoke")
router.get("/login/:token/confirm", LoginController, "confirm")

router.get("/pomodoro", PomodoroController, "get")
router.put("/pomodoro", PomodoroController, "put")

router.express.use((req, res) => {
  res.status(404).json({
    status: {
      code: 404,
      message: "Resource not found",
      path: req.path,
    },
  })
})
