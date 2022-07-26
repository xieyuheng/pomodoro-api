import { EmailRegisterController } from "@/server/controllers/EmailRegisterController"
import { useApp } from "@/server/useApp"

export default defineEventHandler(async (event) => {
  const token = event.context.params.token
  const controller = new EmailRegisterController(await useApp(), event)
  return await controller.confirm(token)
})
