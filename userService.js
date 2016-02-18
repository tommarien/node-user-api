/**
 * Created by tommarien on 18/02/16.
 */

import db from './db';

export default {
    addKey(user, key){
        try {
            user.apiKeys.push(key);
            db.save(user);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}