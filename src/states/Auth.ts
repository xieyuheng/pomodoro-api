import { UserJson, UserSchema } from "../types/UserJson"

export class Auth {
  user: UserJson | null = null

  async loadUser(): Promise<this> {
    if (this.user) return this
    if (!this.token) return this

    const result = await $fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!result) return this.logout()

    this.user = UserSchema.validate(result)
    return this
  }

  get token(): string | null {
    return localStorage.getItem("AccessToken")
  }

  login(token: string) {
    localStorage.setItem("AccessToken", token)
  }

  logout(): this {
    localStorage.removeItem("AccessToken")
    this.user = null
    return this
  }
}
