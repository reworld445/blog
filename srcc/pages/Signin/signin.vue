<template>
  <div id="signin">
    <div class="goback iconfont iconzuojiantou" @click="goback()"></div>
    <div class="signin_warp">
      <h3 class="title">LESHAOTAO.BLOG</h3>
      <transition name="slide-fade">
        <div class="signin" v-if="status==1">
          <el-input placeholder="请输入登录账号" v-model="username" clearable prefix-icon="el-icon-user"></el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-lock"></el-input>
          <el-button class="sign" @click="signin()">登录</el-button>
          <p class="signin_tab" @click="to_signup()">
            Let go?
            <span>Sign Up !</span>
          </p>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="signup" v-if="status==2">
          <el-input placeholder="请输入登录账号" v-model="username" clearable prefix-icon="el-icon-user"></el-input>
          <el-input placeholder="请输入昵称" v-model="nickname" clearable prefix-icon="el-icon-user"></el-input>
          <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-lock"></el-input>
          <el-button class="sign" @click="signup()">注册</el-button>
          <p class="signin_tab">
            <span @click="to_signin()">Back to Sign In !</span>
          </p>
        </div>
      </transition>
      <div v-if="status==3" class="loading">
        <div v-if="!txtSignIn" class="outside"></div>
        <p v-else class="txt">Sign In</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore, setStore, setCookieByMinutes } from "@/utils";
import { postSignup, postSignin } from "@/api";
export default {
  name: "signin",
  components: {},
  data() {
    return {
      status: 1, //1登录,2注册，3loading
      username: "",
      password: "",
      nickname: "", //昵称
      txtSignIn: false,
    };
  },
  methods: {
    //注册
    async signup() {
      if (this.username.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入登录账号!",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      if (this.nickname.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入用户昵称",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      if (this.password.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入登录密码",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      if (this.username.length < 6) {
        this.$message({
          showClose: true,
          message: "用户名不能少于6位!",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      if (this.password.length < 6) {
        this.$message({
          showClose: true,
          message: "登录密码不能少于6位!",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      const res = await postSignup({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      });
      if (res.data.status === 0) {
        this.$message({
          showClose: true,
          message: "用户名已存在",
          type: "error",
          duration: 1000,
          center: true,
        });
      }
      if (res.data.status === 1) {
        this.$message({
          showClose: true,
          message: "注册成功",
          type: "success",
          duration: 1000,
          center: true,
        });
        this.reset();
        setInterval(function () {
          this.status = 1;
        }, 1000);
      }
    },

    //登录
    async signin() {
      if (this.username.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入登录账号!",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      if (this.password.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入登录密码",
          type: "error",
          duration: 1000,
          center: true,
        });
        return;
      }
      const res = await postSignin({
        username: this.username,
        password: this.password,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.status = 3;
        this.$store.commit("changeIsSignIn", 1); //isSignIn 0代表没登录 1代表普通游客登录,2代表管理员登录
        this.$store.commit("changeIndex", "5");
        setStore("u_n", res.data.username); //username
        setStore("nickName", res.data.nickName);
        setStore("avatar", res.data.avatar);
        setCookieByMinutes("_t",res.data.token,1440);
        setTimeout(() => {
          this.txtSignIn = true;
          setTimeout(() => {
            this.$router.push({ path: "home" });
          }, 1500);
        }, 3000);
      } else {
        this.$message({
          showClose: true,
          message: "登录失败!",
          type: "error",
          center: true,
        });
      }
    },

    //重置数据
    reset() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
    //切换注册页面
    to_signup() {
      this.status = 2;
      this.reset();
    },
    //切换登录页面
    to_signin() {
      this.status = 1;
      this.reset();
    },
    // 回到首页
    goback() {
      this.$router.push({
        path: "/blog",
      });
    },
  },
  created() {},
};
</script>

<style scoped>
.goback {
  position: absolute;
  top: 0px;
  left: 1.5rem;
  color: #ffff;
  font-weight: bold;
  font-size: 1.925rem;
  margin-top: 1.575rem;
}
.goback:hover {
  color: #5da9ff;
}
.loading {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 50px auto;
}
.outside {
  border: 4px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: loadOut 1s infinite;
  position: absolute;
  left: 50%;
  top: 50%;
}
.txt {
  color: rgba(255, 255, 255, 0);
  animation: txtLarge 1.5s;
  text-align: center;
  line-height: 100px;
}
@keyframes loadOut {
  from {
    width: 0;
    height: 0;
    margin-left: 0;
    margin-top: 0;
  }
  to {
    width: 92px;
    height: 92px;
    margin-left: -50px;
    margin-top: -50px;
    opacity: 0;
  }
}
@keyframes txtLarge {
  from {
    transform: scale(1);
    color: rgba(255, 255, 255, 0);
  }
  to {
    transform: scale(3);
    color: rgba(255, 255, 255, 0.6);
  }
}
#signin {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/images/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
}
.signin_tab {
  cursor: Pointer;
  font-size: 1.125rem;
  color: #ffff;
}
.signin_tab:hover {
  color: #5da9ff;
}
.title {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1.875rem;
  color: #5da9ff;
}
.signin_warp {
  position: relative;
  display: flex;
  align-items: center;
  width: 26.625rem;
  height: 22.5625rem;
  /* background: #fff; */
  border-radius: 0.625rem;
  /* padding: 3.125rem; */
  box-sizing: border-box;
  flex-direction: column;
}
.signup,
.signin {
  display: flex;
  position: absolute;
  top: 3.25rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex: 1;
}
.signin > .el-input {
  width: 80%;
  margin-bottom: 20px;
}
.signup > .el-input {
  width: 80%;
  margin-bottom: 15px;
}
.signin > .el-button {
  margin-bottom: 1.25rem;
}
.signup > .el-button {
  margin-bottom: 0.9375rem;
}
.sign {
  width: 50%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
@media screen and (max-width: 767px) {
  #signin {
    position: relative;
    height: 100vh;
    background-image: url("../../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
