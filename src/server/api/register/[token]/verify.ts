export default defineEventHandler((event) => {
  const token = event.context.params.token
  return { token }
})
