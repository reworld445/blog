<template>
  <div class="studylog">
    <div class="edit_head">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_head">封面图片</div>
    <el-upload
      class="study_logo"
      action="http://127.0.0.1:8088/api/studylog/cover"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imgpath" :src="imgpath" class="study_logo_img" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <div class="category">
      <div class="edit_head">分类</div>
      <el-checkbox-group v-model="category">
        <el-checkbox v-for="category in categorys" :label="category" :key="category">{{category}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="edit_head">简介</div>
    <el-input type="textarea" :rows="5" placeholder="请输入简介" v-model="introduction"></el-input>
    <div class="edit_head">内容</div>
    <div class="markdown">
      <mavon-editor v-model="content" />
    </div>
    <div class="save_button">
      <el-button type="primary" @click="save()">保存</el-button>
    </div>
  </div>
</template>
<script>
import { saveStudylog } from "@/api";
export default {
  name: "studylog",
  components: {},
  data() {
    return {
      title: "", //标题
      introduction: "", //简介
      category: [], //分类
      content: "", //内容
      categorys: [
        "JavaScript",
        "ES6",
        "jQuery",
        "css",
        "ajax",
        "http",
        "https",
        "Vue",
        "react",
        "react-native",
        "node",
        "mongo",
        "webpack",
        "wx",
        "其他",
      ],
      imgpath: "",
      filename: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgpath = URL.createObjectURL(file.raw);
      console.log(res);
      this.filename = res.filename;
    },
    async save() {
      let saveObj = {
        title: this.title,
        timestamp: Date.now(),
        category: this.category,
        introduction: this.introduction,
        content: this.content,
        filename: this.filename,
      };
      const res = await saveStudylog({
        StudylogInfor: saveObj,
      });
      console.log(res);
      if (res.data.status === 1) {
        this.$message({
          showClose: true,
          message: "博客添加成功",
          type: "success",
          center: true,
          offset: 40,
        });
        setTimeout(() => {
          location.reload()
        },1000);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.studylog {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
}
.edit_head {
  margin: 1.25rem 0;
  text-align: left;
}
.save_button {
  margin-top: 1.25rem;
}
.markdown {
  display: flex;
}
.study_logo {
  width: 150px;
  height: 150px;
}
.study_logo_img {
  width: 100%;
  height: 100%;
}
.avatar-uploader-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  font-size: 100px;
}
</style>
