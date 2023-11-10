const router = require('express').Router();

const userRoutes = require('./user-routes');
const albumRoutes = require('./album-routes');
const songRoutes = require('./song-routes');


router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);

module.exports = router;