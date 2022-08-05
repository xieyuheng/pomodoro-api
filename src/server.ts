import { Server } from "./framework/http/Server"
import { config } from "./config"

export const server = new Server({
  router: {
    cors: {
      origin: config.app_url,
    },
  },
})
