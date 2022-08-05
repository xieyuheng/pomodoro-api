import { UserController } from "@/server/controllers/UserController"

export default defineEventHandler(async (event) => {
  const controller = new UserController(event)
  const user = await controller.current()
  if (user) return user.json()
  else return null
})
