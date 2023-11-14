const router = require('express').Router();
const { Albums, Songs } = require('../models');

router.get('/', (req, res))