/* global process */
export default {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'dev',
    mongoUri: 'mongodb://localhost/users'
}
