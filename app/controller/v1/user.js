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
      code: {
        type: 'string',
      },
    };

    ctx.validate(rule);
    const user = await ctx.service.v1.user.findByEmail(model.email);

    if (user) {
      ctx.body = {
        msg: 'Email is occupied',
      };
      ctx.status = 409;
    } else {
      const validateCode = await app.redis.get('validateCode').get(model.email);
      const validateResult = validateCode === model.code;

      if (validateResult) {
        await ctx.service.v1.user.insertOne(model);

        ctx.body = {
          msg: 'Signup successful',
        };
        ctx.status = 201;
      } else {
        ctx.body = {
          msg: 'Verification failed',
        };
        ctx.status = 500;
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
      const userData = {
        userId: signinedUser.id,
        isAdmin: 0,
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
        error: 'Incorrect email or password',
      };
      ctx.status = 401;
    }
  }

  // 发送验证邮件
  async validateEmail() {
    const { ctx, app } = this;
    const model = ctx.request.body;
    const rule = {
      email: {
        type: 'email',
      },
      type: {
        type: 'string',
      },
    };

    ctx.validate(rule);
    const isUser = await ctx.service.v1.user.findByEmail(model.email);
    const hasSendEmail = await app.redis.get('emailLimit').exists(ctx.ip);

    if (hasSendEmail) {
      ctx.body = {
        msg: 'Please do not send email frequently',
      };
      ctx.status = 500;
    } else if (!isUser && model.type === 'RESET') {
      ctx.body = {
        msg: 'Please signup first',
      };
      ctx.status = 404;
    } else if (isUser && model.type === 'SIGNUP') {
      ctx.body = {
        msg: 'Email is occupied',
      };
      ctx.status = 409;
    } else {
      const validateCode = ctx.helper.generateCode();

      ctx.runInBackground(async () => {
        // 设置 100 秒不能重新发送验证邮件
        await app.redis.get('emailLimit').set(ctx.ip, 'limit', 'EX', 100);
        // 设置验证码过期时间为 24 小时
        await app.redis.get('validateCode').set(model.email, validateCode, 'EX', 60 * 60 * 24);

        if (model.type === 'SIGNUP') {
          await ctx.service.v1.email.send(
            model.email,
            ctx.__('Email validate'),
            'validate',
            validateCode
          );
        }

        if (model.type === 'RESET') {
          await ctx.service.v1.email.send(
            model.email,
            ctx.__('Password reset verificate'),
            'resetPass',
            validateCode
          );
        }
      });

      ctx.body = {
        msg: 'Mail sent successfully',
      };
      ctx.status = 200;
    }
  }

  // 重置密码
  async resetPass() {
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
      code: {
        type: 'string',
      },
    };

    ctx.validate(rule);
    const isUser = await ctx.service.v1.user.findByEmail(model.email);

    if (!isUser) {
      ctx.body = {
        msg: 'Please signup first',
      };
      ctx.status = 404;
    } else {
      // 验证验证码
      const validateCode = await app.redis.get('validateCode').get(model.email);
      const result = validateCode === model.code;

      if (result) {
        // 重置密码
        await ctx.service.v1.user.updatePass(isUser.id, model.password);

        ctx.body = {
          msg: 'Reset password successfully',
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
}

module.exports = UserController;
