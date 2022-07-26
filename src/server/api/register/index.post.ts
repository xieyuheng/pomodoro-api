import { EmailRegisterController } from "@/controllers/EmailRegisterController"

export default defineEventHandler(async (event) => {
  const controller = await EmailRegisterController.create(event)
  return await controller.store()
})
