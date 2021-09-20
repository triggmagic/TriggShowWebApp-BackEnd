const router = require('express').Router();

router.use('/playCards', require('./play-cards'));
router.use('/playCardsAdmin', require('./play-cards-admin'));

module.exports = router;