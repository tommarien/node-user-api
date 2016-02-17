import { UnauthorizedError } from '../httpErrors';
import httpStatus from 'http-status-codes';
import jwtToken from '../services/jwtToken';

export default function jwtTokenAuthentication(req, res, next) {
    var authorizationHeader = req.get('authorization');

    if (authorizationHeader) {
        const match = authorizationHeader.match(/bearer\s(.*)/);
        if (match) {
            try {
                jwtToken.decode(match[1]);
                return next();
            }
            catch (e) {
                // silently ignored, jwt library throws error when not ok !!!
                console.log(e);

            }
        }
    }

    return next(new UnauthorizedError());
}