const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/:id', withAuth, (req, res) => {

    function songFinder(songRev) {
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
                    res.render('edit-song-rev', { songRev, songs, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    };

    SongReview.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        },
        include: [
            {
                model: Song,
                include: [
                    {
                        model: Album,
                        include: [
                            {
                                model: Artist
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(songRevData => {
        const songRev = JSON.parse(JSON.stringify(songRevData));
        songFinder(songRev);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;