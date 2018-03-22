'use strict';

module.exports = app => {
  const { DATE, STRING, BOOLEAN, INTEGER } = app.Sequelize;

  // 用户模型
  const User = app.model.define('user', {
    id: {
      allowNull: false,
      unique: true,
      type: STRING,
      primaryKey: true,
      comment: '主键',
    },
    email: {
      allowNull: false,
      unique: true,
      type: STRING,
      validate: {
        isEmail: true,
      },
      comment: '用户邮箱',
    },
    password: {
      allowNull: false,
      type: STRING,
      comment: '用户密码',
    },
    nickname: {
      allowNull: true,
      type: STRING,
      comment: '昵称',
    },
    love_email: {
      allowNull: true,
      unique: true,
      type: STRING,
      comment: '情人邮箱',
    },
    love_time: {
      allowNull: true,
      type: STRING,
      comment: 'Lovemail 发送时间',
    },
    love_date: {
      allowNull: true,
      type: STRING,
      comment: '恋爱日期',
    },
    love_city: {
      allowNull: true,
      type: STRING,
      comment: '情人所在城市',
    },
    love_color: {
      allowNull: true,
      type: STRING,
      comment: '模板主题色',
    },
    love_temp: {
      allowNull: true,
      type: INTEGER,
      comment: '邮件模板',
    },
    isStart: {
      allowNull: false,
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否开启推送',
    },
    created_at: {
      allowNull: false,
      type: DATE,
      comment: '创建日期',
    },
    updated_at: {
      allowNull: false,
      type: DATE,
      comment: '更新日期',
    },
  }, { timestamps: false });

  return User;
};
