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


app.post('/api/nhanvien/login', function (req, res) {
     axios.post('http://services.quanlyshop.vn/api/nhanvien/login', req.body).then(r => {
          if (r) res.send(r.data);
     }).catch(r => {
          if (r) res.send(r.response.data);
     })
});

app.post('/api/voip/getcustomer', function (req, res){
     axios.post('http://services.quanlyshop.vn/api/voip/getcustomer',req.body).then(r=>{
          if (r) res.send(r.data);
     }).catch(r => {
          if (r) res.send(r.response.data);
     })
});

app.post('/api/voip/gethistory', function (req, res){
     axios.post('http://services.quanlyshop.vn/api/voip/gethistory',req.body).then(r=>{
          if (r) res.send(r.data);
     }).catch(r => {
          if (r) res.send(r.response.data);
     })
});

app.post('/api/voip/getOrderDetail', function (req, res){
     axios.post('http://services.quanlyshop.vn/api/voip/getOrderDetail',req.body).then(r=>{
          if (r) res.send(r.data);
     }).catch(r => {
          if (r) res.send(r.response.data);
     })
});

app.post('/api/voip/creatednote', function (req, res){
     axios.post('http://services.quanlyshop.vn/api/voip/creatednote',req.body).then(r=>{
          if (r) res.send(r.data);
     }).catch(r => {
          if (r) res.send(r.response.data);
     })
});

app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname + '/app-client/dist/index.html'));
});

app.listen(process.env.PORT || config.PORT, console.log('server is listening port ' + config.PORT));
// app.listen(process.env.PORT || config.PORT,'192.168.1.22', console.log('server is listening port ' + config.PORT));