const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/', withAuth, (req, res) => {
    Song.findAll({
        attributes: [
            'id',
            'name',
        ],
        include: [
            {
                model: Album,
                attributes: ['name'],
                include: [
                    {
                        model: Artist,
                        attributes: ['name']
                    }
                ]
            }
        ]
    })
    .then(songData => {
        const songs = songData.map(song => song.get({ plain: true }));
        res.render('add-song-rev', { songs, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;