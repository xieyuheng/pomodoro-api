const { server } = require("./lib/server")

server
  .run({
    port: Number(process.env.PORT),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  })
  .catch((error) => {
    console.error(error)
  })
