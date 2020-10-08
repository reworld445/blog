const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser')
const cors = require('cors');

const express = require('express');

const api = require('./api')
const app = express();
const session = require('express-session');

// 设为静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 跨域
app.use(cors());
// app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.json());
//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }));
app.use(api)


var server = app.listen(8088, function () {
    console.log("服务器启动,port:8088")
})