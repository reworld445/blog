<template>
  <div class="studyEdit">
    <div class="studyedit_warp">
      <div class="close" @click="close()">
        <i class="el-icon-close"></i>
      </div>
      <div class="study_info">
        <div class="study_info_warp">
          <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="id" style="font-weight: bold">
              <el-input v-model="form.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title" style="font-weight: bold">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category" style="font-weight: bold">
              <el-checkbox-group v-model="form.category">
                <el-checkbox
                  v-for="category in form.categorys"
                  :label="category"
                  :key="category"
                >{{category}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="edit_head">封面图片</div>
            <el-upload
              class="study_logo"
              action="http://127.0.0.1:8088/api/studylog/cover"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.imgpath" :src="form.imgpath" class="study_logo_img" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="简介" prop="introduction" style="font-weight:bold" size="medium ">
              <el-input type="textarea" v-model="form.introduction" class="textarea_warp"></el-input>
            </el-form-item>

            <div class="edit_head">内容</div>
            <div class="markdown">
              <mavon-editor v-model="form.content" />
            </div>
            <div class="btns">
              <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="close()">取消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStudylogDetail, updataStudylog } from "@/api";
export default {
  name: "studyedit",
  props: ["id", "index"],
  data() {
    return {
      form: {
        id: "",
        title: "",
        introduction: "",
        category: [], //分类
        content: "",
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
        timestamp: "",
        oldimg:""
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
      this.form.imgpath = URL.createObjectURL(file.raw);
      this.form.filename = res.filename;
      console.log(res);
    },
    close() {
      this.$emit("close", false);
    },
    async getStudylogDetail() {
      let res = await getStudylogDetail({ id: this.id });
      console.log(res);
      this.form.id = res.data._id;
      this.form.title = res.data.title;
      this.form.introduction = res.data.introduction;
      this.form.category = res.data.category;
      this.form.imgpath = res.data.filename;
      this.form.filename = res.data.filename;
      this.form.content = res.data.content;
      this.form.timestamp = res.data.timestamp;
      this.form.oldimg = res.data.filename.split("/").pop();
    },
    async save() {
      let saveObj = {
        title: this.form.title,
        timestamp: this.form.timestamp,
        category: this.form.category,
        introduction: this.form.introduction,
        content: this.form.content,
        filename: this.form.filename,
        oldimg:this.form.oldimg
      };
      const res = await updataStudylog({
        id: this.id,
        StudylogInfor: saveObj,
      });
      console.log(res.data)
      if (res.data.status === 1) {
        this.$message({
          showClose: true,
          message: "博客信息更新成功",
          type: "success",
          center: true,
          offset: 40,
        });
        // location.reload()
        this.$emit("update", saveObj, this.index);
      }
      this.close();
    },
  },
  created() {
    this.getStudylogDetail();
   
  },
  mounted() {},
};
</script>

<style scoped>
.markdown {
  display: flex;
}
.btns {
  display: flex;
  justify-content: center;
  margin-top: 40px;
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
.edit_head {
  margin: 1.25rem 0;
  text-align: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  font-weight: bold;
}
.studyEdit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.studyedit_warp {
  position: relative;
  background: #fff;
  width: 75%;
  height: 80%;
  /* border-radius: 0.9375rem; */
  box-sizing: border-box;
  padding: 1.875rem;
  overflow-y: auto;
}
/*滚动条整体样式*/
.studyedit_warp::-webkit-scrollbar {
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
/*滚动条里面小方块*/
.studyedit_warp::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
/*滚动条里面轨道*/
.studyedit_warp::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: #ededed;
}
/* .studyedit_warp::-webkit-scrollbar {
  display: none;
} */
.close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 1.875rem;
}
.study_info {
  padding: 1.25rem 1.875rem;
}
.el-form-item__error {
  left: 50% !important;
}
</style>
