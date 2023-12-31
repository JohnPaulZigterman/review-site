const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    Artist.findAll()
    .then(artistData => res.json(artistData))
    .catch(err => {
        console.log(err);
        res.status.apply(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Artist.findByPk(req.params.id)
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
        const newArtist = await Artist.create({
            ...req.body,
        });

        res.status(200).json(newArtist);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', (req, res) => {
    Artist.update(req.body, {
        where: { id: req.params.id }
    })
    .then(artistData => {
        if (!artistData) {
            res.status(404).json('No Artist With That ID!');
            return;
        }
        res.json(artistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Artist.destroy({ where: { id: req.params.id } })
    .then(artistData => {
        if(!artistData) {
            res.status(404).json({ message: 'No Artist With That ID!' });
        }
        res.status(200).json(artistData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;