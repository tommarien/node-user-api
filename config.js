module.exports = {
    environment: process.env.NODE_ENV || 'dev',
    port : process.env.PORT || 3000,
    db: {
        uri: process.env.DB || "mongodb://localhost/userapi",
    }
};
