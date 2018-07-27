
import Router from 'koa-better-router'
import UserController from './controller/user'

const router = Router().loadMethods()
const api = Router({ prefix: '/api/v1' })
api.get('/register', UserController.register)
api.post('/register', UserController.register)
api.extend(router)

export { api, router }