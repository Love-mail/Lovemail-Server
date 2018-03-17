'use strict';

module.exports = app => {
  const { DATE, STRING } = app.Sequelize;

  // 城市模型
  const City = app.model.define('city', {
    id: {
      allowNull: false,
      unique: true,
      type: STRING,
      primaryKey: true,
      comment: '主键',
    },
    cityName: {
      allowNull: false,
      type: STRING,
      comment: '城市名',
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

  return City;
};
