const configs = require("../external/config");
const JWT = require("../external/jwt");
const user = require("../entity/user");

class UsuarioCasoDeUso {
    constructor(user) {
        this.user = user;
    }

    autenticar() {
        const authJwt = new JWT(configs.secret, this.user);
        return {
            "access_token": authJwt.sign(),
            "expires_in": 3600,
            "scope": "customScope",
            "token_type": "Bearer"
        };
    }
}

module.exports = UsuarioCasoDeUso;
