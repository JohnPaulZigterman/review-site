const sequelize = require('../config/connection');

const userData = require('./userData.json');
const artistData = require('./artistData.json');
const albumData = require('./albumData.json');
const songData = require('./songData.json');
const songReviewData = require('./songRevData.json');
const albumReviewData = require('./albumRevData.json');
const { User, Artist, Album, Song, SongReview, AlbumReview } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    await Artist.bulkCreate(artistData);
    await Album.bulkCreate(albumData);
    await Song.bulkCreate(songData);
    await SongReview.bulkCreate(songReviewData);
    await AlbumReview.bulkCreate(albumReviewData);

    process.exit(0);
  };
  
  seedDatabase();