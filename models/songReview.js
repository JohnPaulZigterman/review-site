const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class songReview extends Model {}

songReview.init(
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
          song_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'song',
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
        modelName: 'songreview',
      }
);

module.exports = songReview;