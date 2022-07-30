import { UserJson, UserSchema } from "../types/UserJson"
import { useAuth } from "./useAuth"

let currentUser: UserJson | null = null

export function setCurrentUser(user: UserJson | null): void {
  currentUser = user
}

export async function useCurrentUser(): Promise<UserJson | null> {
  if (currentUser) return currentUser

  const { token } = useAuth()
  if (!token) return null

  const result = await $fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!result) return null

  const user = UserSchema.validate(result)
  currentUser = user
  return user
}
