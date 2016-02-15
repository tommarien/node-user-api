const config = require('./../config');

module.exports = (err, req, res, next)=> {

    var result = {
        "code": "InternalServerError",
        "message": "Oops! something went wrong!"
    };

    if (config.environment === 'dev')
        Object.assign(result, {details: err.stack});

    res.status(500)
        .send(result);

};
