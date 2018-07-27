import Koa from 'koa';
import bodyParser from 'koa-better-body';
import Convert from 'koa-convert';
import { api, router } from './router'

const app = new Koa()

app.use(Convert(bodyParser()))
app.use(router.middleware());
app.use(api.middleware());

app.listen(3000, () => {
  console.log("Server Stared on http://localhost:3000")
  api.getRoutes().forEach(route => {
    console.log(`${route.method} http://localhost:3000${route.path}`)
  })
})