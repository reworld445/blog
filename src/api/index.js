import request from '@/utils/request'

var baseUrl = "http://106.12.172.79:8088/"
// 获取所有学习笔记列表
// export const newComment = (data, loadingStr) => request("/api/comment/new", data, "POST")

// 获取所有学习笔记列表
export const getStudylogList = (data, loadingStr) => request("http://106.12.172.79:8088/api/studylogList", data, "POST")

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