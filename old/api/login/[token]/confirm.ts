import { EmailLoginController } from "@/server/controllers/EmailLoginController"

export default defineEventHandler(async (event) => {
  const token = event.context.params.token
  const controller = new EmailLoginController(event)
  return await controller.confirm(token)
})
