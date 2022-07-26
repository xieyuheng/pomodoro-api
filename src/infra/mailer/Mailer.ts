import nodemailer from "nodemailer"

type ServerOptions = {
  smtp: {
    host: string
    port: number
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
      auth: {
        user: this.sender.address,
        pass: this.sender.password,
      },
    })
  }

  async send(options: {
    to: string
    subject: string
    text?: string
    html?: string
    logger?: (info: any) => Promise<void>
  }): Promise<void> {
    const from = `${this.sender.username} <${this.sender.address}>`
    const { to, subject, text, html } = options
    const logger = options.logger || ((info) => {})
    const info = await this.transporter.sendMail(options)
    await logger(info)
  }
}
