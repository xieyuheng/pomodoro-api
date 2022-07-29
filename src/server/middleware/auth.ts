import { AccessTokenController } from "@/server/controllers/AccessTokenController"

export default defineEventHandler(async (event) => {
  const controller = new AccessTokenController(event)

  const headers = useRequestHeaders(["authorization"])
  if (headers.authorization?.startsWith("Bearer ")) {
    const token = headers.authorization.slice("Bearer ".length)
    const auth = await controller.auth(token)
    console.log({ auth })
    event.context.auth = auth
  }
})
