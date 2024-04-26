const { Response } = require('express');
const HttpStatus = require('http-status');
const ResponseAPI = require('./ResponseAPI');

class ResponseErrors {
    err(response, err) {
        if (err instanceof BadRequestError) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
        } else if (err instanceof Error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message));
        }
    }
}

module.exports = new ResponseErrors();
