import { useFetch } from "#imports"
import { UserJson, UserSchema } from "../types/UserJson"

export class Auth {
  user: UserJson | null = null

  async loadUser(): Promise<void> {
    if (this.user) return

    const token = useCookie("token")

    if (!token.value) {
      console.log({
        who: "loadUser",
        message: "cookie is not set for token",
      })

      return
    }

    console.log({ token: token.value })

    const { data } = await useFetch("/api/user", {
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    })

    console.log({ data: data.value })

    if (!data.value) return

    this.user = UserSchema.validate(data.value)
  }

  logout(): void {
    this.user = null
  }
}
