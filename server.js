var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
const axios = require('axios');
var config = require('./config');
var app = express();
var cors = require('cors');
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname, 'app-client/dist')));
app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname + '/app-client/dist/index.html'));
});

app.listen(process.env.PORT || config.PORT, console.log('server is listening port ' + config.PORT));