export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  if (auth.user) return

  await auth.loadUser()
  if (!auth.user) {
    return navigateTo("/", { replace: true })
  }
})
