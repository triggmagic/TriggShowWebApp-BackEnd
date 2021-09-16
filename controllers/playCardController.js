const { playCardsService } = require('../services');
const requestHandler = require('../utils/request-handler')
const _ = require('lodash');

const syncPlayCards = async (req, res, next) => {
    try {
        await playCardsService.syncDataAirtableToFirebase();
        return requestHandler.sendSuccess(res, {}, "Play cards synchronized")
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const getAllPlayCards = async (req, res, next) => {
    try {
        const { limit, page } = req.query;
        const data = await playCardsService.getAllPlayCards(limit, page);
        return requestHandler.sendSuccess(res, data)
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
}
const resetAllPlayCards = async (req, res, next) => {
    try {
        await playCardsService.setAllDataToReset();
        return requestHandler.sendSuccess(res, {}, "Play cards reset")
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const getNewPlayCard = async (req, res, next) => {
    try {
        const data = await playCardsService.getNewPlayCard();
        return requestHandler.sendSuccess(res, data, "Generate new card")
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
}

module.exports = { syncPlayCards, getAllPlayCards, resetAllPlayCards, getNewPlayCard };
