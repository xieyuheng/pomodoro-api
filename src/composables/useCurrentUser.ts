import { UserJson, UserSchema } from "../types/UserJson"
import { useAuth } from "./useAuth"

let cachedUser: UserJson | null = null

export async function useCurrentUser(): Promise<UserJson | null> {
  if (cachedUser) return cachedUser

  const { token } = useAuth()
  if (!token) return null

  const result = await $fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!result) return null

  const user = UserSchema.validate(result)
  cachedUser = user
  return user
}
