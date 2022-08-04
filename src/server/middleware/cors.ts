import { AccessTokenController } from "@/server/controllers/AccessTokenController"

export default defineEventHandler(async (event) => {
  event.req.setHeader("Access-Control-Allow-Origin", "*")
})
