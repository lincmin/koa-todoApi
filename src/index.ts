var Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
  ctx.body = "todo app"
})
app.listen(3000, () => {
  console.log("Server Stared on http://localhost:3000")
})