
import Router from 'koa-better-router'

const router = Router().loadMethods()
const api = Router({ prefix: '/api/v1' })
api.extend(router)

export { api, router }