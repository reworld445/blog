<template>
  <div class="useredit">
    <div class="useredit_warp">
      <div class="close" @click="close()">
        <i class="el-icon-close"></i>
      </div>
      <div class="user_info">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户id">
            <el-input v-model="id" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="成为管理员" prop="type">
            <el-switch v-model="type"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getOneUser, updataUser } from "@/api";
export default {
  name: "useredit",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userData: [],
      search: "",
      user_item: "",
      username: "",
      nickName: "",
      type: -1,
      ruleForm: {
        password: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      
    };
  },
  props: ["id",'index'],
  methods: {
    close() {
      this.$emit("close", false);
    },
    async getOneUser() {
      let id = this.id;
      const res = await getOneUser({ id: id });
      this.user_item = res.data[0];
      this.username = this.user_item.username;
      this.nickName = this.user_item.nickName;
      this.ruleForm.password = this.user_item.password;
      this.ruleForm.checkPass = this.user_item.password;
      this.type = this.user_item.type;
      if (this.type == 1) {
        this.type = true;
      } else {
        this.type = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let _type;
          if (this.type) {
            _type = 1;
          } else {
            _type = 2;
          }
          let userInfor = {
            id: this.id,
            password: this.ruleForm.password,
            nickName: this.nickName,
            type: _type,
          };
          const res = await updataUser({ userInfor: userInfor });
          console.log(res);
          if (res.data.status === 1) {
            this.$message({
              showClose: true,
              message: "用户信息更新成功",
              type: "success",
              center: true,
              offset: 40,
            });
            // location.reload()
            this.$emit("update", userInfor,this.index);
          }
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.getOneUser();
  },
  mounted() {},
};
</script>

<style scoped>
.useredit {
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
.useredit_warp {
  position: relative;
  background: #fff;
  width: 25rem;
  height: 31.25rem;
  border-radius: 0.9375rem;
  box-sizing: border-box;
  padding: 50px 30px 20px 0;
}
.close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 1.875rem;
}
</style>
