export default defineEventHandler(async (event) => {
  const token = event.context.params.token
  return { token }
})
