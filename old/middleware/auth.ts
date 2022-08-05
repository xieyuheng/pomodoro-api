import { AccessTokenController } from "../../server/controllers/AccessTokenController"

export default defineEventHandler(async (event) => {
  const controller = new AccessTokenController(event)
  await controller.auth()
})
