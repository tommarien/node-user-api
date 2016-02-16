import userValidator from './../validators/userValidator';

module.exports = (req, res, next)=> {
    const result = userValidator.validate(req.body);

    if (result && result.isValid)
        return next();

    return res.status(400).send(result);
};
