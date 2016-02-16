export default (user, password) => {
    return (req, res, next) => {

        const authorizationHeader = req.get('authorization');
        console.log(authorizationHeader);

        if (authorizationHeader) {
            const headerParts = authorizationHeader.split(' ');
            if (headerParts.length == 2 && headerParts[0].match(/basic/i)) {
                const userPassword = new Buffer(headerParts[1], 'base64').toString();
                console.log(userPassword);

                var parts = userPassword.split(':');
                if (parts[0] === user && parts[1] === password)
                    return next();
            }
        }

        res.status(401).send();
    }
};
