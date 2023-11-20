const router = require('express').Router();
const withAuth = require('../../utils/withauth');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

//retrieves all album reviews
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

//retrieves one album review by id
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

//posts an album review
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

router.put('/:id', withAuth, (req, res) => {
    AlbumReview.update(req.body, {
        where: { 
            id: req.params.id,
            user_id: req.session.user_id
        }
    })
    .then(reviewData => {
        if (!reviewData) {
            res.status(404).json('No Review With That ID!');
            return;
        }
        res.json(reviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    AlbumReview.destroy({ where: { id: req.params.id } })
    .then(reviewData => {
        if(!reviewData) {
            res.status(404).json({ message: 'No Review With That ID!' });
        }
        res.status(200).json(reviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;