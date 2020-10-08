const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/tao');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

//user
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    nickName: String,
    type: String,//1管理员，2游客
    token: String,
    avatar: String
})
//学习笔记
const studylogSchema = new mongoose.Schema({
    title: String,//标题
    timestamp: String,//时间戳
    category: Array,//分类类别
    introduction: String,//简介
    filename:String,//封面图片信息
    content: String,//内容
    comments: Array//评论
})

// 博客记录
const bloglogSchema = new mongoose.Schema({
    title: String,//标题
    timestamp: String,//时间戳
    introduction: String,//简介
    filename:String,//封面图片信息
    content: String,//内容
    comments: Array//评论
})

const Models = {
    User: mongoose.model('User', userSchema),
    Studylog: mongoose.model('Studylog', studylogSchema),
    Bloglog: mongoose.model('Bloglog', bloglogSchema),
}

module.exports = Models;
