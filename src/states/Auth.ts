import { UserJson, UserSchema } from "../types/UserJson"

function isServer() {
  return typeof window === "undefined"
}

export class Auth {
  user: UserJson | null = null

  async loadUser(): Promise<void> {
    if (isServer()) {
      return this.loadUserServer()
    }

    if (this.user) return

    const data = await $fetch("/api/user")
    if (!data) return

    this.user = UserSchema.validate(data)
  }

  async loadUserServer(): Promise<void> {
    if (this.user) return

    const headers = useRequestHeaders(["cookie"])
    const data = await $fetch("/api/user", { headers: headers as any })
    if (!data) return

    this.user = UserSchema.validate(data)
  }

  logout(): void {
    const token = useCookie("token")
    token.value = ""
    this.user = null
  }
}
