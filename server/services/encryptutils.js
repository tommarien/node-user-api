import crypto from 'crypto';

export function encrypt(algorithm, data) {
    return crypto.createHash(algorithm || 'SHA256').update(data).digest('base64');
};
