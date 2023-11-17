const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/', withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.session.user_id },
        include: [
            {
                model: AlbumReview,
                include: [{
                    model: Album,
                    include: [{
                        model: Artist
                    }]
                }]
            },
            {
                model: SongReview,
                include: [{
                    model: Song,
                    include: [{
                        model: Album,
                        include: [{
                            model: Song
                        }]
                    }]
                }]
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No User With That ID!' });
            return;
        }
        const user = userData.map(user => user.get({ plain: true }));
        res.render('dash', { user });
    })
})

module.exports = router;