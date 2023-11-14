const router = require('express').Router();
const { User, Artist, Album, Song, AlbumReview, SongReview } = require('../models');
const songReview = require('../models/songReview');

router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'id',
            'name'
        ],
        include: [
            {
                Model: AlbumReview,
                attributes: [
                    'id',
                    'title',
                    'review',
                    'album_id'
                ],
                include: {
                    model: Album,
                    attributes: [
                        'id',
                        'name',
                        'artist_id'
                    ],
                    include: {
                        model: Artist,
                        attributes: ['name']
                    }
                }
            },
            {
                model: SongReview,
                attributes: [
                    'id',
                    'title',
                    'review',
                    'song_id'
                ],
                include: {
                    model: Song,
                    attributes: [
                        'id',
                        'name',
                        'album_id'
                    ],
                    include: {
                        model: Album,
                        attributes: [
                            'id',
                            'name',
                            'artist_id'
                        ],
                        include: {
                            model: Artist,
                            attributes: ['name']
                        }
                    }
                }
            }
        ]
    })
    .then(userData => {
        const users = userData.map(user => user.get({ plain: true }));
        res.render('homepage', { users });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;