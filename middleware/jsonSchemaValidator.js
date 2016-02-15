'use strict'

function jsonSchemaValidator(err, req, res, next) {
    let responseData;
    if (err.name === 'JsonSchemaValidation') {

        // Log the error however you please
        console.log(err.message);
        // logs "express-jsonschema: Invalid data found"

        // Set a bad request http response status
        res.status(400);

        // Format the response body
        responseData = {
            code: 'Bad Request',
            message: "One or more input validation is invalid",
            errors: err.validations  // All of your validation information
        };

        // Respond with the right content type
        res.json(responseData);

    } else {
        // pass error to next error middleware handler
        next(err);
    }
};

module.exports = jsonSchemaValidator;
