const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    Album.findAll()
    .then(albumData => res.json(albumData))
    .catch(err => {
        console.log(err);
        res.status.apply(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Album.findByPk(req.params.id)
    .then(albumData => {
        if (!albumData) {
            res.status(404).json({ message: 'No Album With That ID!' });
            return;
        } else {
            res.json(albumData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
    try {
        const newAlbum = await Album.create({
            ...req.body,
        });

        res.status(200).json(newAlbum);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;