'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async signup() {
    const { ctx, app } = this;
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
      const hasSignuped = await app.redis.get('signupLimit').exists(ctx.ip);

      if (hasSignuped) {
        ctx.body = {
          msg: 'Please do not signup frequently',
        };
        ctx.status = 500;
      } else {
        const signupedUser = await ctx.service.v1.user.insertOne(model);
        const validateCode = ctx.helper.generateCode();

        ctx.runInBackground(async () => {
          // 设置 60 秒不能再次注册
          await app.redis.get('signupLimit').set(ctx.ip, 'limit', 'EX', 60);
          // 设置邮箱验证码过期时间为 24 小时
          await app.redis.get('signupCode').set(signupedUser.id, validateCode, 'EX', 60 * 60 * 24);
          await ctx.service.v1.email.send(
            model.email,
            ctx.__('Email validate'),
            'validate',
            validateCode
          );
        });

        ctx.body = {
          msg: 'Signup successful and check your mailbox',
          data: {
            userId: signupedUser.id,
          },
        };
        ctx.status = 201;
      }
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

  // 邮箱验证码验证
  async validate() {
    const { ctx } = this;
    const model = ctx.request.body;
    const rule = {
      userId: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
    };

    ctx.validate(rule);
    const result = await ctx.service.v1.user.validate(model.userId, model.code);

    if (result) {
      ctx.body = {
        msg: 'Verification success',
      };
      ctx.status = 200;
    } else {
      ctx.body = {
        msg: 'Verification failed',
      };
      ctx.status = 500;
    }
  }
}

module.exports = UserController;
