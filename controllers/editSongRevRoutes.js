const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/', withAuth, (req, res) => {
    SongReview.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'song_id',
            'review',
            'title'
        ],
        include: [
            {
                model: Song,
                attributes: ['name'],
                include: {
                    model: Artist,
                    attributes: ['name']
                }
            }
        ]
    })
    .then(songReviewData => {
        const songReviews = songReviewData.map(songReview => songReview.get({ plain: true }));
        res.render('edit-song-rev', { songReviews, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;