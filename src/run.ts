import { server } from "./server"
import { useApp } from "./useApp"

async function run() {
  const app = await useApp()

  await server.run({
    port: Number(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
}

run().catch((error) => {
  console.error(error)
})
