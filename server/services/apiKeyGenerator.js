'use strict';
import secureString from 'secure-random-string';


class ApiKeyGenerator {
    constructor(lenght) {
        this.lenght = lenght || 20;
    }

    generate() {
        const secured = secureString({length: this.lenght});
        return new Buffer(secured).toString('base64');
    }
}

export default new ApiKeyGenerator();
