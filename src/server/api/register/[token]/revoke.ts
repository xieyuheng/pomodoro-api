import { EmailRegisterController } from "@/controllers/EmailRegisterController"

export default defineEventHandler(async (event) => {
  const token = event.context.params.token
  const controller = new EmailRegisterController(event)
  return await controller.revoke(token)
})
