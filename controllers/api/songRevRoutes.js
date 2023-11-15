const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const songRevData = SongReview.findAll({
            attributes: [
                'id',
                'title',
                'review',
                'song_id'
            ],
            order: ['created_at', 'DESC'],
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
        });
        if (!songRevData) {
            res.status(404).json({ message: 'No data found!' });
        }
        res.json(songRevData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;