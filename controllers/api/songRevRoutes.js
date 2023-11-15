const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', async (req, res) => {
        SongReview.findAll({
            attributes: [
                'id',
                'title',
                'review',
                'song_id'
            ],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Song,
                    attributes: ['name'],
                    include: [
                        {
                            model: Album,
                            attributes: ['name']
                        },
                        {
                            model: Artist,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        })
        .then(songRevData => res.json(songRevData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    
});

module.exports = router;