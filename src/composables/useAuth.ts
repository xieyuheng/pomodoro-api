import { setCurrentUser } from "./useCurrentUser"

export function useAuth(): {
  token: string | null
  login: (token: string) => void
  logout: () => void
} {
  const token = localStorage.getItem("AccessToken")
  const login = (token: string) => {
    localStorage.setItem("AccessToken", token)
  }
  const logout = () => {
    localStorage.removeItem("AccessToken")
    setCurrentUser(null)
  }

  return { token, login, logout }
}
