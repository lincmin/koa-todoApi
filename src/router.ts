
import Router from 'koa-better-router'
import UserController from './controller/user'
import TodoController from './controller/todo'
import FolderController from './controller/folder'

const router = Router().loadMethods()
const api = Router({ prefix: '/api/v1' })
api.get('/register', UserController.register)
api.post('/register', UserController.register)
api.post('/login', UserController.login);

//todoFolder
api.get('/folder/:id', FolderController.show)
api.post('/folder', FolderController.creat)
api.put('/folder/:id', FolderController.edit)
api.del('/folder/:id', FolderController.delete)

// todo
api.get('/todo/:id', TodoController.show)
api.post('/todo', TodoController.create)
api.put('/todo/:id', TodoController.edit)
api.del('/todo/:id', TodoController.delete)
api.extend(router)

export { api, router }