'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async signup() {
    const { ctx } = this;
    const model = ctx.request.body;

    const rule = {
      email: {
        type: 'email',
      },
      password: {
        type: 'string',
        min: 4,
        max: 20,
      },
    };

    ctx.validate(rule);
    const result = await ctx.service.v1.user.findByEmail(model.email);

    if (result) {
      ctx.body = {
        msg: 'Email is occupied',
      };
      ctx.status = 409;
    } else {
      await ctx.service.v1.user.insertOne(model);
      await ctx.service.v1.email.send(
        'thelovemail@126.com',
        model.email,
        ctx.__('Email validate'),
        'validate'
      );

      ctx.body = {
        msg: 'Signup successful',
      };
      ctx.status = 201;
    }
  }

  // 登录
  async signin() {
    const { ctx } = this;
    const model = ctx.request.body;

    const rule = {
      email: {
        type: 'email',
      },
      password: {
        type: 'string',
        min: 4,
        max: 20,
      },
    };

    ctx.validate(rule);
    const signinedUser = await ctx.service.v1.user.findBySignin(model);

    if (signinedUser) {
      if (signinedUser.email_validate) {
        const userData = {
          id: signinedUser.id,
        };

        ctx.body = {
          msg: 'Signin successful',
          data: {
            accessToken: ctx.helper.generateToken(userData),
          },
        };
        ctx.status = 200;
      } else {
        ctx.body = {
          error: 'Email is not verified',
        };
        ctx.status = 401;
      }
    } else {
      ctx.body = {
        error: 'Incorrect email or password',
      };
      ctx.status = 401;
    }
  }
}

module.exports = UserController;
