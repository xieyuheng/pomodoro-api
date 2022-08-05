import { EmailRegisterController } from "@/server/controllers/EmailRegisterController"

export default defineEventHandler(async (event) => {
  const controller = new EmailRegisterController(event)
  return await controller.create()
})
