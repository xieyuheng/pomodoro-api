import { AccessTokenController } from "./controllers/AccessTokenController"
import { WelcomeController } from "./controllers/WelcomeController"
import { UserController } from "./controllers/UserController"
import { EmailLoginController } from "./controllers/EmailLoginController"
import { EmailRegisterController } from "./controllers/EmailRegisterController"
import { Router } from "./framework/routing/Router"

export const router = new Router()

router.use("*", AccessTokenController, "auth")

router.get("/", WelcomeController, "welcome")

router.get("/user", UserController, "current")

router.get("/register", EmailRegisterController, "create")
router.get("/register/:token/verify", EmailRegisterController, "verify")
router.get("/register/:token/revoke", EmailRegisterController, "revoke")
router.get("/register/:token/confirm", EmailRegisterController, "confirm")

router.get("/login", EmailLoginController, "create")
router.get("/login/:token/verify", EmailLoginController, "verify")
router.get("/login/:token/revoke", EmailLoginController, "revoke")
router.get("/login/:token/confirm", EmailLoginController, "confirm")

router._router.use((req, res) => {
  res.status(404).json({
    status: {
      code: 404,
      message: "Resource not found",
      path: req.path,
    },
  })
})
