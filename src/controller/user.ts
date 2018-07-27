import Koa from 'koa'
import UserUtil, { User } from '../model/user'

export default {
  async register(ctx: Koa.Context, next) {
    console.log('fields', ctx.request.fields)
    try {
      const { username, email, password } = ctx.request.fields
      try {
        const user = await UserUtil.createUser({
          username,
          email,
          password
        })
        ctx.body = JSON.stringify(user)
      } catch (e) {
        console.error(e)
        ctx.status = 422
        ctx.body = '[Unprocesable entity] \n验证失败，' + e.errors[0].message
      }
    } catch (e) {
      console.error(e)
      ctx.status = 422
      ctx.body = '[Unprocesable entity] \n验证失败，必须传递 username/email/password 三个字段'
    }
    await next()
  }
}