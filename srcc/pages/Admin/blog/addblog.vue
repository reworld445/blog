<template>
  <div class="addblog">
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <div class="edit_head">封面图片</div>
      <el-upload
        class="blog_logo"
        action="http://127.0.0.1:8088/api/bloglog/cover"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="ruleForm.imgpath" :src="ruleForm.imgpath" class="blog_logo_img" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item label="分类" prop="category" style="font-weight: bold">
        <el-checkbox-group v-model="ruleForm.category">
          <el-checkbox
            v-for="category in ruleForm.categorys"
            :label="category"
            :key="category"
          >{{category}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="简介" prop="introduction" style="font-weight:bold" size="medium ">
        <el-input type="textarea" v-model="ruleForm.introduction" class="textarea_warp"></el-input>
      </el-form-item>

      <div class="edit_head">内容</div>
      <div class="markdown">
        <mavon-editor v-model="ruleForm.content" />
      </div>

      <div class="save_button">
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { saveBloglog } from "@/api";
export default {
  name: "addblog",
  components: {},
  data() {
    return {
      ruleForm: {
        title: "",
        category: [],
        introduction: "",
        categorys: ["日记", "游记", "游戏", "摄影", "汽车", "其他"],
        content: "", //内容
        imgpath: "",
        filename: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个分类",
            trigger: "change",
          },
        ],
        introduction: [
          { required: true, message: "请填写简介", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.imgpath = URL.createObjectURL(file.raw);
      this.ruleForm.filename = res.filename;
    },
    async save() {
      let saveObj = {
        title: this.ruleForm.title,
        timestamp: Date.now(),
        category: this.ruleForm.category,
        introduction: this.ruleForm.introduction,
        content: this.ruleForm.content,
        filename: this.ruleForm.filename,
      };
      const res = await saveBloglog({
        BlogInfor: saveObj,
      });
      if (res.data.status === 1) {
        this.$message({
          showClose: true,
          message: "博客添加成功",
          type: "success",
          center: true,
          offset: 40,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.addblog {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
}
.edit_head {
  margin-top: 1.25rem;
  text-align: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  font-weight: bold;
}
.save_button {
  margin-top: 1.25rem;
}
.markdown {
  display: flex;
}
.blog_logo {
  width: 150px;
  height: 150px;
}
.blog_logo_img {
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
