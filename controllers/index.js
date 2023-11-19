const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');
const addAlbumRevRoutes = require('./addAlbumRevRoutes');
const addSongRevRoutes = require('./addSongRevRoutes');
const viewUserRoutes = require('./viewUserRoutes');
const viewSongRevRoutes = require('./viewSongRevRoutes');
const viewAlbumRevRoutes = require('./viewAlbumRevRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dash', dashRoutes);
router.use('/add-album-rev', addAlbumRevRoutes);
router.use('/add-song-rev', addSongRevRoutes);
router.use('/user', viewUserRoutes);
router.use('/songreview', viewSongRevRoutes);
router.use('/albumreview', viewAlbumRevRoutes);

router.use((req, res) => res.status(404).end());

module.exports = router;