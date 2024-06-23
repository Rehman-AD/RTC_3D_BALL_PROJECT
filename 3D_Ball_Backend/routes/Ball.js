const express = require('express');
const { getAllPositions, savePosition } = require('../controllers/ballController');
const router = express.Router();

router.get('/positions', getAllPositions);
router.post('/position', savePosition);

module.exports = router;


