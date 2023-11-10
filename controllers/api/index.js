const router = require('express').Router();

const userRoutes = require('./userRoutes');
const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');


router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);

module.exports = router;