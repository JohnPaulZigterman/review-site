const router = require('express').Router();
const withAuth = require('../../utils/withauth');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    AlbumReview.findAll({
        attributes: [
            'id',
            'title',
            'review',
            'album_id'
        ],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Album,
                attributes: ['name'],
                include: [
                    {
                        model: Artist,
                        attributes: ['name']
                    }
                ]
            }
        ]
    })
    .then(albumRevData => res.json(albumRevData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});

router.get('/:id', (req, res) => {
AlbumReview.findByPk(req.params.id, {
    attributes: [
        'id',
        'title',
        'review',
        'album_id'
    ],
    include: [
        {
            model: User,
            attributes: ['name']
        },
        {
            model: Album,
            attributes: ['name'],
            include: [
                {
                    model: Artist,
                    attributes: ['name']
                }
            ]
        }
    ]
})
.then(albumRevData => res.json(albumRevData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.post('/', withAuth, async (req, res) => {
try {
    const newAlbumRev = await AlbumReview.create({
        ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newAlbumRev);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;