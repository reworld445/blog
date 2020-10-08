"use strict";

const db = require('./db');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const upload = require('./utils/multer')

const path = require('path');




// 注册
router.post('/api/admin/signup', (req, res) => {
    db.User.find({ username: req.body.username }, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        if (data.length > 0) {
            res.send({ 'status': 0, 'msg': '用户名已注册' });
        } else {
            let newUser = new db.User({
                username: req.body.username,
                password: req.body.password,
                nickName: req.body.nickname,
                avatar: null,//用户头像路径s
                type: 2
                //1为管理员，2为游客,写死，新建管理员数据库直接改
            })
            newUser.save(function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'status': 1, 'msg': '注册成功' });
                }
            })
        }
    })
})

//登录
router.post('/api/admin/signin', (req, res) => {
    db.User.find({ username: req.body.username, password: req.body.password }, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        if (data.length > 0) {
            let content = { username: req.body.username } //生成token的信息
            let secretKey = "123456" //（密钥）
            let token = jwt.sign(content, secretKey, {
                expiresIn: 60 * 60 * 24
            })
            data[0].token = token
            db.User(data[0].save(err => {
                if (err) {
                    res.status(500).send()
                    return
                }
                res.send({ 'status': 1, 'msg': '登陆成功', 'token': data[0].token, 'username': data[0]["username"], 'type': data[0]["type"], 'nickName': data[0]["nickName"], 'avatar': data[0]["avatar"] })
            }))
        } else {
            res.send({ 'status': 0, 'msg': '登录失败' });
        }
    })
})


// 获取所有学习笔记列表
router.post('/api/studylogList', (req, res) => {
    console.log(req.body)
    let n = req.body.page
    if (req.body.type === 'admin') {
        db.Studylog.find({}, (err, data) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(data)
        }).skip(10 * n).limit(10).sort({ "_id": -1 })
    } else {
        db.Studylog.find({}, (err, data) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(data)
        }).skip(4 * n).limit(4).sort({ "_id": -1 })
    }
})

// 获取所有学习笔记详情页
router.post('/api/studylogDetail', (req, res) => {
    db.Studylog.findOne({ _id: req.body.id }, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let prev = {};
        let next = {};
        db.Studylog.find({ '_id': { "$gt": req.body.id } }).then(res2 => {//上一条
            if (res2.length > 0) {
                prev.title = res2[0]["title"];
                prev._id = res2[0]["_id"];
            }
            db.Studylog.find({ '_id': { "$lt": req.body.id } }) //下一条
                .then(res3 => {
                    if (res3.length > 0) {
                        next.title = res3[res3.length - 1]["title"];
                        next._id = res3[res3.length - 1]["_id"];
                    }
                    let obj = JSON.parse(JSON.stringify(data));
                    console.log(obj)
                    obj.prev = prev;
                    obj.next = next;
                    res.send(obj)
                })
        })
    })
})

// 获取所有学习笔记分类
router.post('/api/studytype', (req, res) => {
    db.Studylog.find({}, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        let arr = [];
        let data_categories = [];
        data.forEach((item, i) => {
            let cates = item.category

            cates.forEach((v, n) => {
                if (!arr.includes(v)) {

                    let obj = {
                        "type": cates[n],
                        "list": [{
                            "_id": data[i]['_id'],
                            "date": data[i]['date'],
                            "title": data[i]['title'],
                            "category": data[i]['category']
                        }]
                    }
                    data_categories.push(obj);
                    arr.push(cates[n]);
                } else {

                    let obj = {
                        "_id": data[i]['_id'],
                        "date": data[i]['date'],
                        "title": data[i]['title'],
                        "category": data[i]['category']
                    }
                    data_categories.forEach((z, x) => {
                        if (z['type'] == cates[n]) {
                            z['list'].push(obj)
                        }
                    })
                }
            })
        })
        res.send(data_categories)
    })
})






// admin
//学习笔记保存
router.post('/api/admin/saveStudylog', (req, res) => {
    req.body.StudylogInfor.filename = 'http://' + req.headers.host + '/uploads/' + req.body.StudylogInfor.filename
    let newStudylog = new db.Studylog(req.body.StudylogInfor);
    newStudylog.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'status': 1, 'msg': '保存成功' });
        }
    })
})

// 上传学习笔记封面
router.post('/api/studylog/cover', upload.single('file'), async (req, res) => {
    var file = req.file;
    res.send(file)
})

// 获取所有用户列表
router.get('/api/userList', (req, res) => {
    db.User.find({}, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(data)
    })
})

// 删除用户
router.post('/api/userDelete', (req, res) => {
    db.User.remove({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'status': 1, 'msg': '删除成功' })
    })
})

// 获取单个用户详情信息
router.post('/api/getOneUser', (req, res) => {
    db.User.find({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        res.send(data)
    })
})

// 用户更新
router.post('/api/updataUser', (req, res) => {
    let info = req.body.userInfor
    // console.log(info)
    let id = info.id
    // console.log(id)
    db.User.find({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        // console.log(data)
        data[0].password = info.password
        data[0].nickName = info.nickName
        data[0].type = info.type
        db.User(data[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'status': 1, 'msg': '更新成功' })
        })
    })
})






module.exports = router;