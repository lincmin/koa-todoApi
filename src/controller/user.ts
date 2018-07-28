import Koa from 'koa'
import UserUtil, { User } from '../model/user'
import ph from 'password-hash'
import jwt from 'jsonwebtoken';

const secret = 'todo-app';
function getFields(ctx: Koa.Context, next): any {
  try {
    const { username, email, password } = ctx.request.fields
    return [username, email, password]
  } catch (e) {
    console.log(e)
    ctx.status = 422
    ctx.body = '[Unprocesable entity] \n验证失败，必须传递 username/email/password 三个字段'
  }
}

function exceptPassword(user: any) {
  user = JSON.parse(JSON.stringify(user))
  if (user.password) delete user.password
  return user
}

export default {
  async register(ctx: Koa.Context, next) {
    console.log('fields', ctx.request.fields)
    const [username, email, password] = getFields(ctx, next)
    try {
      const user = await UserUtil.createUser({
        username,
        email,
        password
      })
      const ret = exceptPassword(user);
      ctx.body = jwt.sign(ret, secret);
    } catch (e) {
      console.error(e)
      ctx.status = 422
      ctx.body = '[Unprocesable entity] \n验证失败，' + e.errors[0].message
    }
    await next()
  },
  async login(ctx: Koa.Context, next) {
    const [_, email, password] = getFields(ctx, next)
    ctx.status = 400
    try {
      const db_user = await User.findOne({
        where: {
          email
        }
      })
      if (ph.verify(password, db_user.password)) {
        ctx.status = 200
        const ret = exceptPassword(db_user);
        ctx.body = {
          message: '登录成功',
          user: ret,
          token: jwt.sign({
            data: ret,
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置 token 过期时间60 seconds * 60 minutes = 1 hour
          }, secret)
        }
      } else {
        ctx.body = '密码不正确'
      }
    } catch (e) {
      ctx.body = e.error[0].message
    }
    await next()
  }
}