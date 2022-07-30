import { useFetch } from "#imports"
import { UserJson, UserSchema } from "../types/UserJson"

export class Auth {
  user: UserJson | null = null

  async loadUser(): Promise<this> {
    if (this.user) return this

    const headers = useRequestHeaders(["cookie"])
    const { data } = await useFetch("/api/user", {
      headers: headers as any
    })

    console.log({
      who: "Auth.loadUser",
      cookie: headers.cookie,
      data: data.value,
    })

    if (!data.value) return this

    this.user = UserSchema.validate(data.value)

    return this
  }

  logout(): void {
    this.user = null
  }
}
