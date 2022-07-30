import { useFetch } from "#imports"
import { UserJson, UserSchema } from "../types/UserJson"

export class Auth {
  user: UserJson | null = null

  async loadUser(): Promise<void> {
    if (this.user) return

    const headers = useRequestHeaders(["cookie"])
    const { data } = await useFetch("/api/user", {
      headers: headers as any
    })

    console.log({
      cookie: headers.cookie,
      data: data.value,
    })

    if (!data.value) return

    this.user = UserSchema.validate(data.value)
  }

  logout(): void {
    this.user = null
  }
}
