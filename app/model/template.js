'use strict';

module.exports = app => {
  const { DATE, STRING } = app.Sequelize;

  // 城市模型
  const Template = app.model.define('template', {
    id: {
      allowNull: false,
      unique: true,
      type: STRING,
      primaryKey: true,
      comment: '主键',
    },
    tempName: {
      allowNull: false,
      unique: true,
      type: STRING,
      comment: '模板名称',
    },
    tempDemo: {
      allowNull: true,
      type: STRING,
      comment: '模板 demo 图片 url',
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

  return Template;
};
