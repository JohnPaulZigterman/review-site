const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class albumReview extends Model {}

albumReview.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          review: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          album_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'album',
              key: 'id',
            },
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'albumreview',
      }
);

module.exports = albumReview;