const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/', withAuth, (req, res) => {
    AlbumReview.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'album_id',
            'review',
            'title'
        ],
        include: [
            {
                model: Album,
                attributes: ['name'],
                include: {
                    model: Artist,
                    attributes: ['name']
                }
            }
        ]
    })
    .then(albumReviewData => {
        const albumReviews = albumReviewData.map(albumReview => albumReview.get({ plain: true }));
        res.render('edit-album-rev', { albumReviews, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;