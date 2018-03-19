'use strict';

const Controller = require('egg').Controller;

class LovemailController extends Controller {
  // 保存用户 Lovemail 设置
  async save() {
    const { ctx, app } = this;
    const model = ctx.request.body;
    const rule = {
      love_email: {
        type: 'email',
      },
      love_msg: {
        type: 'string',
        allowEmpty: true,
        max: 150,
        required: false,
      },
      love_time: {
        type: 'string',
      },
      love_date: {
        type: 'string',
      },
      love_city: {
        type: 'string',
        allowEmpty: true,
        required: false,
      },
      love_color: {
        type: 'string',
      },
      love_temp: {
        type: 'string',
      },
      isStart: {
        type: 'boolean',
      },
    };

    ctx.validate(rule);
    const isLimit = await app.redis.get('setEmailLimit').exists(ctx.state.user.data.userId);
    const isOccupy = await ctx.service.v1.lovemail.findByLovemail(model.love_email);

    if (isOccupy) {
      ctx.body = {
        msg: 'Email is occupied',
      };
      ctx.status = 409;
    } else if (isLimit) {
      ctx.body = {
        msg: 'Cannot repeatedly modify lover mailbox within 24 hours',
      };
      ctx.status = 500;
    } else {
      await ctx.service.v1.lovemail.save(ctx.state.user.data.userId, model);
      ctx.body = {
        msg: 'Set up Successfully',
      };
      ctx.status = 200;
    }
  }

  // 更新用户 Lovemail 设置
  async update() {
    const { ctx, app } = this;
    const model = ctx.request.body;
    const rule = {
      love_email: {
        type: 'email',
        required: false,
      },
      love_msg: {
        type: 'string',
        allowEmpty: true,
        max: 150,
        required: false,
      },
      love_time: {
        type: 'string',
        required: false,
      },
      love_date: {
        type: 'string',
        required: false,
      },
      love_city: {
        type: 'string',
        allowEmpty: true,
        required: false,
      },
      love_color: {
        type: 'string',
        required: false,
      },
      love_temp: {
        type: 'string',
        required: false,
      },
      isStart: {
        type: 'boolean',
        required: false,
      },
    };

    ctx.validate(rule);
    const isLimit = await app.redis.get('setEmailLimit').exists(ctx.state.user.data.userId);
    const isOccupied = await ctx.service.v1.lovemail.findByLovemail(model.love_email);

    if (model.love_email && isOccupied) {
      ctx.body = {
        msg: 'Email is occupied',
      };
      ctx.status = 409;
    } else if (model.love_email && isLimit) {
      ctx.body = {
        msg: 'Cannot repeatedly modify lover mailbox within 24 hours',
      };
      ctx.status = 500;
    } else {
      await ctx.service.v1.lovemail.update(ctx.state.user.data.userId, model);
      ctx.body = {
        msg: 'Set up Successfully',
      };
      ctx.status = 200;
    }
  }

  // 解绑对象邮箱
  async untie() {
    const { ctx } = this;

    await ctx.service.v1.lovemail.untie(ctx.state.user.data.userId);
    ctx.body = {
      msg: 'Untie email Successfully',
    };
    ctx.status = 200;
  }
}

module.exports = LovemailController;
