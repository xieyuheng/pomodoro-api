import { env } from "../framework/config/env"

export const config = {
  mode: process.env.NODE_ENV,
  app_url: env("APP_URL"),
  redis: {
    url: env("REDIS_URL"),
  },
  mail: {
    server: {
      smtp: {
        host: env("MAIL_HOST"),
        port: Number.parseInt(env("MAIL_PORT")),
        encryption: env("MAIL_ENCRYPTION"),
      },
    },
    sender: {
      username: env("MAIL_USERNAME"),
      address: env("MAIL_ADDRESS"),
      password: env("MAIL_PASSWORD"),
    },
  },
}
