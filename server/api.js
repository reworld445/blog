const express = require('express');
const router = express.Router();
var request = require('request');
const db = require('./db');


const blog = [
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
    {
        name: 'html的使用',
        id: 1,
        neirong: '飞机升空拦截阿斯科利非计算机斯科拉进空间',
        route:'/blog/html',
        autor:'Wang1996',
        tag: 'html',
        time: '2020-5-1'
    },
]


request.post({url:'/api/neirong', form:{
    "pageno": 1,
    "pagesize": 200,
    "condstr": "社会大课堂: 0"
}}, function(error, response, body) {
    console.log(error,response,body)
})

router.get('/api/blog', (req, res) => {
    res.send(blog)
})
router.post('/api/getWenZhang', (req, res) => {
    this.blog.find({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        res.send(data)
    })
})
module.exports = router