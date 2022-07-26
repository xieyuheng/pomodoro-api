import nodemailer from "nodemailer"

type ServerOptions = {
  smtp: {
    host: string
    port: number
    encryption: string
  }
}

type SenderOptions = {
  username: string
  address: string
  password: string
}

export class Mailer {
  server: ServerOptions
  sender: SenderOptions

  private transporter: nodemailer.Transporter

  constructor(opts: { server: ServerOptions; sender: SenderOptions }) {
    this.server = opts.server
    this.sender = opts.sender

    this.transporter = nodemailer.createTransport({
      host: this.server.smtp.host,
      port: this.server.smtp.port,
      secure: this.server.smtp.encryption === "tls",
      auth: {
        user: this.sender.username,
        pass: this.sender.password,
      },
    })
  }

  async send(options: {
    to: string
    from: string
    subject: string
    text?: string
    html?: string
    logger?: (info: any) => Promise<void>
  }): Promise<void> {
    const logger = options.logger || ((info) => {})
    const info = await this.transporter.sendMail(options)
    await logger(info)
  }
}
