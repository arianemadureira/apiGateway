const jwt = require('jsonwebtoken');
const Configs = require('../external/config');
const HttpStatus = require('http-status');

class Auth {
    validate(request, response, next) {

        var token = request.headers['authorization'];
        if (token) {
            let bearer = String(token).split(' ');
            let bearerToken = bearer[1];
            jwt.verify(bearerToken, Configs.secret, (error, decoded) => {
                if (error) {
                    response.status(HttpStatus.UNAUTHORIZED).send({
                        'message': 'Invalid Token.'
                    });
                } else {
                    next();
                }
            });
        } else {
            response.status(HttpStatus.UNAUTHORIZED).send({
                'message': 'Unauthorized.'
            });
        }
    }
}

module.exports = new Auth();
