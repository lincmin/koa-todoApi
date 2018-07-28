import Koa from 'koa';
import bodyParser from 'koa-better-body';
import Convert from 'koa-convert';
import { api, router } from './router'
import kjwt from 'koa-jwt';

const app = new Koa()

app.use(Convert(bodyParser()))
app.use(kjwt({ secret: 'todo-app' }).unless({ path: [/^\/api\/v1\/(login|register)/] }))
app.use(router.middleware());
app.use(api.middleware());
app.use(async (ctx, next) => {
  console.log("state \n");
  console.log(ctx.state);
  await next();
})

app.listen(3000, () => {
  console.log("Server Stared on http://localhost:3000")
  api.getRoutes().forEach(route => {
    console.log(`${route.method} http://localhost:3000${route.path}`)
  })
})