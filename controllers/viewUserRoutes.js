const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
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
        var sendUserData = JSON.parse(JSON.stringify(userData));
        //res.status(200).json(userData);
        res.render('view-user', { sendUserData, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;