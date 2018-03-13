'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
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
    const signupedUser = await ctx.service.v1.user.insertOne(model);

    ctx.body = {
      signupedUser
    }
    ctx.status = 200;
  }
}

module.exports = UserController;