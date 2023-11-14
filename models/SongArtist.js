const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SongArtist extends Model {}

SongArtist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        song_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'song',
                key: 'id'
            }
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'artist',
                key: 'id'
            }
        }
          
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'songartist',
    }
);

module.exports = SongArtist;