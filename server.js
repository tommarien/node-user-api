const express = require('express');
const config = require('./config');
const app = express();

app.get('/', function(req,res){
   res.send('Welcome Api User')
});

app.listen(config.api.port, function () {
    console.log(`Listening at ${config.api.port}`);
});
