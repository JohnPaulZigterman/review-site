const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    Song.findAll()
    .then(songData => res.json(songData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;