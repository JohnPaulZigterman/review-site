const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');
const withAuth = require('../../utils/withauth');

router.get('/', (req, res) => {
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
        });    
});

router.get('/:id', (req, res) => {
    SongReview.findByPk(req.params.id, {
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
    });
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newSongRev = await SongReview.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newSongRev);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;