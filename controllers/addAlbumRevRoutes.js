const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/', withAuth, (req, res) => {
    Album.findAll({
        attributes: [
            'id',
            'name',
        ],
        include: [
            {
                model: Artist,
                attributes: ['name']
            }
        ]
    })
    .then(albumData => {
        const albums = albumData.map(album => album.get({ plain: true }));
        res.render('add-album-rev', { albums, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;