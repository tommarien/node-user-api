'use strict';
import config from '../config';
import jwt from 'jwt-simple'


class JwtToken {
    constructor(secret) {
        this.secret = secret;
    }

    encode(payload) {
        return jwt.encode(payload, this.secret);
    }

    decode(token) {
        return jwt.decode(token, this.secret);
    }
}

export default new JwtToken(config.api_secret);