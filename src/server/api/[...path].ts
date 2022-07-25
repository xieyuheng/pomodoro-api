export default defineEventHandler((event) => {
  const path = event.context.params.path
  return { status: 404, message: "Resource not found", path }
})
