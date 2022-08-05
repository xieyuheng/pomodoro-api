import { Server } from "./framework/http/Server"
import { router } from "./router"
import { useApp } from "./useApp"
import invariant from "tiny-invariant"

async function run() {
  await useApp()
  const server = new Server(router)
  invariant(process.env.PORT, `PORT is undefined.`)
  await server.run({
    port: Number.parseInt(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
}

run().catch((error) => {
  console.error(error)
})
