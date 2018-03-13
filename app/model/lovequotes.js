'use strict';

module.exports = app => {
  const { DATE, STRING } = app.Sequelize;

  // 爱情语录模型
  const Lovequote = app.model.define('lovequote', {
    id: {
      allowNull: false,
      unique: true,
      type: STRING,
      primaryKey: true,
      comment: '主键',
    },
    content: {
      allowNull: false,
      type: STRING,
      comment: '爱情语录内容',
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

  return Lovequote;
};
