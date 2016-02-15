module.exports = {
    api: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.DB || "mongodb://localhost/userapi",
    }
};
