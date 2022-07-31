export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  await auth.loadUser()
  if (auth.user) {
    return navigateTo("/", { replace: true })
  }
})
