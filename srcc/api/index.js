import request from '@/utils/request'

// 注册
export const postSignup = (data, loadingStr) => request("/api/admin/signup", data, "POST")
// 登录
export const postSignin = (data, loadingStr) => request("/api/admin/signin", data, "POST")

// 检测登录
export const checksign = (data, loadingStr) => request("/api/checktoken", data, "POST")

// 退出登录
export const postSignout = (data, loadingStr) => request("/api/admin/signout", data, "POST")

// 获取所有学习笔记列表
export const newComment = (data, loadingStr) => request("/api/comment/new", data, "POST")

// 获取所有学习笔记列表
export const getStudylogList = (data, loadingStr) => request("/api/studylogList", data, "POST")

// 获取所有学习笔记详情
export const getStudylogDetail = (data, loadingStr) => request("/api/studylogDetail", data, "POST")

// 获取所有学习笔记分类
export const getStudylogtype = (data, loadingStr) => request("/api/studytype", data, "POST")

// 获取所有博客列表
export const getBlogList = (data, loadingStr) => request("/api/blogList", data, "POST")

// 获取所有博客详情
export const getBlogDetail = (data, loadingStr) => request("/api/blogDetail", data, "POST")

// 获取所有博客类
export const getBlogCategory = (data, loadingStr) => request("/api/blogcategory", data, "POST")

// 分类名获取列表
export const getcategory = (data, loadingStr) => request("/api/categorylist", data, "POST")

// 后台管理系统

// 1.获取所有用户列表
export const getUserList = (data, loadingStr) => request("/api/userList", data, "POST")
// 2.删除用户
export const deleteUser = (data, loadingStr) => request("/api/userDelete", data, "POST")
// 3.获取单个用户信息
export const getOneUser = (data, loadingStr) => request("/api/getOneUser", data, "POST")
//4.用户更新
export const updataUser = (data, loadingStr) => request("/api/updataUser", data, "POST")

//5.学习笔记保存
export const saveStudylog = (data, loadingStr) => request("/api/admin/saveStudylog", data, "POST")

//6.学习笔记删除
export const delStudylog = (data, loadingStr) => request("/api/admin/studyDelete", data, "POST")

//6.学习笔记更新
export const updataStudylog = (data, loadingStr) => request("/api/admin/updataStudylog", data, "POST")

//7.博客保存
export const saveBloglog = (data, loadingStr) => request("/api/admin/saveBlog", data, "POST")

//8.博客删除
export const delBloglog = (data, loadingStr) => request("/api/admin/blogDelete", data, "POST")

//6.博客更新
export const updataBlog = (data, loadingStr) => request("/api/admin/updataBlog", data, "POST")