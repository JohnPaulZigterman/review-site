const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const albumRoutes = require('./albumRoutes.js');
const songRoutes = require('./songRoutes.js');
const artistRoutes = require('./artistRoutes.js');
const albumRevRoutes = require('./albumRevRoutes.js');
const songRevRoutes = require('./songRevRoutes.js');


router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/artists', artistRoutes);
router.use('/albumreviews', albumRevRoutes);
router.use('/songreviews', songRevRoutes);

module.exports = router;