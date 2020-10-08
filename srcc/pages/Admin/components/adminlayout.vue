<template>
  <div class="adminlayout">
    <template>
      <el-tabs :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane label="首页">
          <admin-index></admin-index>
        </el-tab-pane>
        <el-tab-pane label="用户管理">
          <div class="study_btns">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">用户列表</span>
                <user-list></user-list>
              </el-tab-pane>
              <el-tab-pane label="用户数据可视化">111</el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="博客管理">
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label">博客列表</span>
              <blog-list></blog-list>
            </el-tab-pane>
            <el-tab-pane label="发布博客">
              <add-blog></add-blog>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="学习管理">
          <div class="study_btns">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">学习笔记列表</span>
                <study-list></study-list>
              </el-tab-pane>
              <el-tab-pane label="发布学习笔记">
                <study-log></study-log>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import AdminIndex from "@/pages/Admin/adminindex";
import UserList from "@/pages/Admin/user/userlist";
import StudyLog from "@/pages/Admin/studylog/addstudylog";
import StudyList from "@/pages/Admin/studylog/studylist";
import BlogList from "@/pages/Admin/blog/bloglist";
import AddBlog from "@/pages/Admin/blog/addblog";

export default {
  name: "adminlayout",
  components: {
    UserList,
    AdminIndex,
    StudyLog,
    StudyList,
    BlogList,
    AddBlog,
  },
  data() {
    return {
      tabPosition: "left",
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.study_btns {
  width: 100%;
}
.study_btn {
  background: rgb(64, 158, 255);
  color: #fff;
  padding: 1.25rem;
  border-radius: 15px;
}

.adminlayout {
  width: 100%;
  height: 100%;
}
</style>
