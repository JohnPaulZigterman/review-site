const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const withAuth = require('../utils/withauth');

router.get('/:id', withAuth, (req, res) => {
    
    function albumFinder(albumRev) {
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
            res.render('edit-album-rev', { albums, albumRev, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    };
    
    AlbumReview.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        },
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
    })
    .then(albumRevData => {
        const albumRev = JSON.parse(JSON.stringify(albumRevData));
        albumFinder(albumRev);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;