import { UnauthorizedError } from '../httpErrors';
import httpStatus from 'http-status-codes';
import jwtToken from '../services/jwtToken';
import moment from 'moment';

export default function jwtTokenAuthentication(req, res, next) {
    var authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const match = authorizationHeader.match(/bearer\s(.*)/);
        if (match) {
            try {
                const payload = jwtToken.decode(match[1]);

                if (moment(payload.exp) > moment()) {
                    req.user = payload;
                    return next();
                }

            }
            catch (e) {
                // silently ignored, jwt library throws error when not ok !!!
                console.log(e);
            }
        }
    }

    return next(new UnauthorizedError());
}