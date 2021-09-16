const { presentProductsService } = require('../services');
const requestHandler = require('../utils/request-handler')
const _ = require('lodash');

const addProduct = async (req, res, next) => {
    try {
        const { body } = req;
        if (_.isEmpty(body)) {
            throw { message: "Please provide data" }
        };
        const doc = await presentProductsService.addDataToPresentProductCollection(body)
        return requestHandler.sendSuccess(res, doc, 'Product added successfully')
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const data = await presentProductsService.getAllDocsFromPresentProducts();
        return requestHandler.sendSuccess(res, data)
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doc = await presentProductsService.getPresentProductDocById(id);
        return requestHandler.sendSuccess(res, doc)
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (_.isEmpty(body) || _.isEmpty(id)) {
            throw { message: "Please provide complete data" }
        };
        delete body.id;
        const doc = await presentProductsService.updatePresentProductByDocId(id, body);
        return requestHandler.sendSuccess(res, doc, "Update record successfully")
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            throw { message: "Please provide complete data" }
        };
        await presentProductsService.deletePresentProductByDocId(id);
        return requestHandler.sendSuccess(res, {}, "Delete record successfully");
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};

const setPresentProductActive = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            throw { message: "Please provide complete data/id" }
        };
        await presentProductsService.setPresentProductActive(id);
        return requestHandler.sendSuccess(res, {}, "Updated record successfully");
    } catch (error) {
        return requestHandler.sendError(res, error)
    }
};


module.exports = { addProduct, deleteProductById, updateProductById, getProductById, getAllProducts, setPresentProductActive };
