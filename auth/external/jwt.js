const jwt = require('jsonwebtoken');
const User = require('../entity/user');

class JWT {
    constructor(secret, user) {
        this.secret = secret;
        this.payload = {
            iss: process.env.DNS,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            name: user.name,
            email: user.email
        };
    }

    sign() {
        return jwt.sign(this.payload, this.secret);
    }
}

module.exports = JWT;
