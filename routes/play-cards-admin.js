const express = require('express');
const router = express.Router();
const { playCardController } = require("../controllers");

router.get('/GetAllPlayCards', playCardController.getAllPlayCards);

router.post('/SyncPlayCards', playCardController.syncPlayCards);

router.post('/ResetAllPlayCards', playCardController.resetAllPlayCards);

module.exports = router;