import { config } from "./config"
import { EmailLoginController } from "./controllers/EmailLoginController"
import { EmailRegisterController } from "./controllers/EmailRegisterController"
import { UserController } from "./controllers/UserController"
import { WelcomeController } from "./controllers/WelcomeController"
import { PomodoroController } from "./controllers/PomodoroController"
import { Router } from "./framework/routing/Router"

export const router = new Router({
  cors: {
    origin: config.app_url,
    credentials: true,
  },
})

router.get("/", WelcomeController, "welcome")

router.get("/user", UserController, "current")

router.post("/register", EmailRegisterController, "create")
router.get("/register/:token/verify", EmailRegisterController, "verify")
router.get("/register/:token/revoke", EmailRegisterController, "revoke")
router.get("/register/:token/confirm", EmailRegisterController, "confirm")

router.post("/login", EmailLoginController, "create")
router.get("/login/:token/verify", EmailLoginController, "verify")
router.get("/login/:token/revoke", EmailLoginController, "revoke")
router.get("/login/:token/confirm", EmailLoginController, "confirm")

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
