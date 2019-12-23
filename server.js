var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
const axios = require('axios');
var config = require('./config');
var app = express();
var cors = require('cors');
var path = require("path");
var fileUpload = require('express-fileupload');
var moment = require('moment');
const fs = require("fs"); // Or `import fs from "fs";` with ESM


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());


app.use(express.static(path.join(__dirname, 'app-client/dist')));
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname + '/app-client/dist/index.html'));
});

app.post('/api/fileUpload', function (req, res) {
     let file = req.files.file;
     var fileName = `${moment().year()}${moment().month() + 1}${moment().date()}_${createRamdomNameImg()}.png`;
     if (file && req.query.pathImg) {
          if (!fs.existsSync('public/' + req.query.pathImg)) {
               fs.mkdirSync('public/' + req.query.pathImg);
          }
          var urlSaveFile = 'public/' + req.query.pathImg + '/';
          file.mv(path.join(__dirname, urlSaveFile + fileName), function (err) {
               if (err) {
                    res.send({ status: 0, message: 'Đã có lổi xẩy ra. Vui lòng thử lại!' })
               } else {
                    res.send({ status: 1, message: 'Thêm thành công!',urlImage:  urlSaveFile + fileName  })
               }
          });
     }else{
          res.send({ status: 0, message: 'Bạn chưa có đường dẫn lưu file!' })
     }
});

function createRamdomNameImg() {
     return 'xxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
     });
}

app.listen(process.env.PORT || config.PORT, console.log('server is listening port ' + config.PORT));