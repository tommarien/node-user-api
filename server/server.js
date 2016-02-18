import mongoConfig from './boot/mongooseConfig';
import app from './boot/expressConfig';
import config from './config';

mongoConfig.configure();

// listen for port
const server = app.listen(config.port, function() {
    console.log(`Server listening on port: ${server.address().port}`);
});
