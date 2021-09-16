const express = require('express');
const router = express.Router();
const { playCardController } = require("../controllers");

router.get('/GetNewPlayCard', playCardController.getNewPlayCard);

module.exports = router;