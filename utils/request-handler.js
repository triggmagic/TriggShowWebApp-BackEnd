const sendSuccess = (res, data, message) => {
    const status = 200;
    return res.status(status).json({
        type: 'success',
        message: message ? message : 'request successfull',
        data: data ? data : {},
    });
};


const sendError = (res, error) => {
    const status = error && error.status ? error.status : 401;
    const message = error && error.message ? error.message : 'Unhandled Error';
    return res.status(status).json({
        type: 'error',
        message
    });
};

module.exports = {
    sendSuccess,
    sendError
}