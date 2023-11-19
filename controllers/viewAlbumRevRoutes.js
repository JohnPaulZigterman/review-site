const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../models');
const albumArt = require('album-art');

router.get('/:id', (req, res) => {

    async function getArt(sendAlbumRevData) {
        albumArt(sendAlbumRevData.album.artist.name, { album: sendAlbumRevData.album.name, size: 'medium' })
        .then(albumArtLink => {
            console.log(albumArtLink);
            res.render('view-album-review', { sendAlbumRevData, albumArtLink, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            return;
        })
    }

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
       getArt(sendAlbumRevData);
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;