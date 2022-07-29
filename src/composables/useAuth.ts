export function useAuth(): {
  token: string | null
  login: (token: string) => void
} {
  const token = localStorage.getItem("AccessToken")
  const login = (token: string) => {
    localStorage.setItem("AccessToken", token)
  }

  return { token, login }
}
