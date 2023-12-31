const router = require('express').Router();
var session = require('express-session');
const { User, SongReview, AlbumReview, Song, Album, Artist } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: AlbumReview,
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
            },
            {
                model: SongReview,
                include: [
                    {
                        model: Song,
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
                    }
                ]
            }
        ]
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: AlbumReview,
            attributes: [
                'id',
                'title',
                'review',
            ],
            include: {
                model: Album,
                attributes: ['name'],
                include: {
                    model: Artist,
                    attributes: ['name']
                }
            }
        },
        {
            model: SongReview,
            attributes: [
                'id',
                'title',
                'review',
            ],
            include: {
                model: Song,
                attributes: ['name'],
                include: {
                    model: Album,
                    attributes: ['name'],
                    include: {
                        model: Artist,
                        attributes: ['name'],
                    }
                }
            }
        }
    ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user in database with that ID!' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: { name: req.body.name }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user in database with that name!'});
            return;
        }
        if (!userData.checkPassword(req.body.password)) {
            res.status(400).json({ message: 'Invalid Password!' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.id = userData.id;
            res.json({ message: `Logged In Successfully! User ID: ${req.session.user_id}` });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json('No user in database with that ID!');
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(userData => {
        if(!userData) {
            res.status(400).json({ message: 'No user in database with that ID!' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/sign-up', (req, res) => {
    const { name, password, email } = req.body;

    User.create({ name, password, email })
        .then(userData => {
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user_id = userData.id;
                req.session.name = userData.name;
                req.session.id = userData.id;
                res.json(userData);
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;