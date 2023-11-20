const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');
const addAlbumRevRoutes = require('./addAlbumRevRoutes');
const addSongRevRoutes = require('./addSongRevRoutes');
const editAlbumRevRoutes = require('./editAlbumRevRoutes');
const editSongRevRoutes = require('./editSongRevRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dash', dashRoutes);
router.use('/add-album-rev', addAlbumRevRoutes);
router.use('/add-song-rev', addSongRevRoutes);
router.use('/edit-album-rev', editAlbumRevRoutes);
router.use('/edit-song-rev', editSongRevRoutes);

router.use((req, res) => res.status(404).end());

module.exports = router;