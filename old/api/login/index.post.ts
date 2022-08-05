import { EmailLoginController } from "@/server/controllers/EmailLoginController"

export default defineEventHandler(async (event) => {
  const controller = new EmailLoginController(event)
  return await controller.create()
})
