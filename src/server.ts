import { Server } from "./framework/http/Server"
import { router } from "./router"

export const server = new Server(router)
