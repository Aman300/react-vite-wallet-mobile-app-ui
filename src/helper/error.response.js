exports.errorResponse = (res, statusCode, statusType, message, data) =>{
    return res.status(statusCode).send({
        status: statusType,
        message: message,
        data: data
    });
};
