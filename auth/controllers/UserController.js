const HttpStatus = require('http-status');
const ResponseAPI = require('../adapters/ResponseAPI');
const UsuarioCasoDeUso = require('../usecase/usuarioCasoDeUso');
const User = require('../entity/user');
const ResponseErrors = require('../adapters/ResponseErrors');

class UserController {
    auth(request, response) {
        try {
            let user = new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            );
            let token = new UsuarioCasoDeUso(user).autenticar();
            response.status(HttpStatus.OK).send(ResponseAPI.data(token));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }
}

module.exports = new UserController();
