const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');

router.get('/:id', (req, res) => {
    SongReview.findOne({
        where: { id: req.params.id },
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
    .then(songRevData => {
        if (!songRevData) {
            res.status(404).json({ message: 'No Song Review With That ID!' });
            return;
        }
        var sendSongRevData = JSON.parse(JSON.stringify(songRevData));
        //res.status(200).json(userData);
        res.render('view-song-review', { sendSongRevData, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;