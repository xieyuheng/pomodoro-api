const app = require("express")()

const response = await fetch("https://example.com")
const text = await response.text()

app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate")
  res.end(text)
})

module.exports = app
