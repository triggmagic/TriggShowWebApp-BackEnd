const router = require('express').Router();

router.get("/", (req, res) => res.send("Welcome"));
router.use('/playCards', require('./play-cards'));
router.use('/playCardsAdmin', require('./play-cards-admin'));

module.exports = router;