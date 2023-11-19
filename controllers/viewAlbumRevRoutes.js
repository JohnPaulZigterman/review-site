const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');

router.get('/:id', (req, res) => {
    AlbumReview.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: Album,
                include: [{
                    model: Artist
                }]
            },
            {
                model: User,
                attributes: [
                    'id',
                    'name'
                ]
            }
        ]
    })
    .then(albumRevData => {
        if (!albumRevData) {
            res.status(404).json({ message: 'No Album Review With That ID!' });
            return;
        }
        var sendAlbumRevData = JSON.parse(JSON.stringify(albumRevData));
        //res.status(200).json(userData);
        res.render('view-album-review', { sendAlbumRevData, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;