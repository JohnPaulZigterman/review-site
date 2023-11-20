const router = require('express').Router();
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    Song.findAll()
    .then(songData => res.json(songData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    Song.findByPk(req.params.id)
    .then(songData => {
        if (!songData) {
            res.status(404).json({ message: 'No Song With That ID!' });
            return;
        } else {
            res.json(songData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
    try {
        const newSong = await Song.create({
            ...req.body,
        });

        res.status(200).json(newSong);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    Song.update(req.body, {
        where: { id: req.params.id }
    })
    .then(songData => {
        if (!songData) {
            res.status(404).json('No Song With That ID!');
            return;
        }
        res.json(songData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Song.destroy({ where: { id: req.params.id } })
    .then(songData => {
        if(!songData) {
            res.status(404).json({ message: 'No Song With That ID!' });
        }
        res.status(200).json(songData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;