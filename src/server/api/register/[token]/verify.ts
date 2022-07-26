import { EmailRegisterController } from "@/controllers/EmailRegisterController"

export default defineEventHandler(async (event) => {
  const token = event.context.params.token
  const controller = await EmailRegisterController.create(event)
  return await controller.verify(token)
})
