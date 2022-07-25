import { EmailRegisterController } from "../../controllers/EmailRegisterController"

export default defineEventHandler(async (event) => {
  const controller = new EmailRegisterController(event)
  return await controller.store()
})
