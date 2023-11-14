const User = require('./User');
const Artist = require('./Artist');
const Album = require('./Album');
const Song = require('./Song');
const AlbumReview = require('./albumReview');
const SongReview = require('./songReview');

User.hasMany(AlbumReview, {
    foreignKey: 'user_id'
});

User.hasMany(SongReview, {
    foreignKey: 'user_id'
});

AlbumReview.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

SongReview.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

SongReview.belongsTo(Song, {
    foreignKey: 'song_id'
});

Song.hasMany(SongReview, {
    foreignKey: 'song_id',
    onDelete: 'cascade'
})

AlbumReview.belongsTo(Album, {
    foreignKey: 'album_id'
});

Album.hasMany(AlbumReview, {
    foreignKey: 'album_id',
    onDelete: 'cascade'
})

Artist.hasMany(Album, {
    foreignKey: 'artist_id',
    onDelete: 'cascade'
});

Album.belongsTo(Artist, {
    foreignKey: 'artist_id',
    onDelete: 'cascade'
});

Artist.hasMany(Song, {
    foreignKey: 'artist_id'
});

Song.belongsToMany(Artist, {
    foreignKey: 'artist_id',
})

Album.hasMany(Song, {
    foreignKey: 'album_id',
    onDelete: 'cascade'
});

Song.belongsTo(Album, {
    foreignKey: 'album_id',
    onDelete: 'cascade'
});

module.exports = { User, Artist, Album, Song, SongReview, AlbumReview };