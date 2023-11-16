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
                model: AlbumReview,
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
            },
            {
                model: SongReview,
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
            }
        ]
    })
    .then(userData => {
        const users = userData.map(user => user.get({ plain: true }));
        res.render('homepage', { users });
//FOR TESTING        //res.status(200).json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;