const express = require('express')
const app = express()
const api = require('./api')
app.use(api)






var server = app.listen(3000,()=>{
    console.log("我开启了博客服务器 prot：30000")
})