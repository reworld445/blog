<template>
  <div class="header">
    <el-row>
      <!-- 移动端顶部导航 -->
      <el-col :xs="4" :sm="0" :md="0" :lg="0" :xl="0">
        <div class="nav-mob">
          <div class="nav_btnlogo" @click="dropdown()">
            <span class="iconfont iconai-kind"></span>
          </div>
          <transition name="el-zoom-in-center">
            <div v-if="nav_isshow" class="nav_mob_drop">
              <ul class="nav_mob_drop_ul">
                
                <li @click="dropdown()" v-if="isSignIn===1">
                  <div class="user_info">
                    <div class="user_img">
                      <img src="../assets/images/rocky.jpg" alt />
                    </div>
                    <div class="mob_username">{{nickName}}</div>
                  </div>
                </li>
                <li class="nav_mob_drop_logo" @click="go_index()">
                  <img src="../assets/images/logo.png" alt />
                </li>
                <li @click="dropdown()">
                  <router-link to="/home">Home</router-link>
                </li>
                <li @click="dropdown()">
                  <router-link to="/blog">Blog</router-link>
                </li>
                <li @click="dropdown()">
                  <router-link to="/studylog">Program</router-link>
                </li>
                <li @click="dropdown()">
                  <router-link to="/about">About Me</router-link>
                </li>
                <li @click="dropdown()" v-if="isSignIn===0">
                  <router-link to="/signin">Sign In</router-link>
                </li>

                <li @click="dropdown()">
                  <div class="iconfont iconcha"></div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </el-col>
      <!-- 前面logo -->
      <el-col :xs="20" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="logo">
          <div class="logo_img"></div>
        </div>
      </el-col>
      <!-- pc端顶部导航 -->
      <el-col :xs="0" :sm="18" :md="18" :lg="18" :xl="18">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo nav_pc"
          mode="horizontal"
          @select="handleSelect"
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <router-link to="/home">
              <i class="iconfont iconshouye1"></i>Home
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/blog">
              <i class="iconfont iconwenjian"></i>Blog
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/studylog">
              <i class="iconfont iconxuexi"></i>Program
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <router-link to="/blog">
              <i class="iconfont iconshoucang"></i>收藏
            </router-link>
          </el-menu-item>-->
          <el-menu-item index="4">
            <router-link to="/about">
              <i class="iconfont icon406biaoqing_mogui"></i>About Me
            </router-link>
          </el-menu-item>
          <el-menu-item index="5" v-if="isSignIn===0">
            <router-link to="/signin">Sign In</router-link>
          </el-menu-item>

          <el-dropdown
            v-else-if="isSignIn===1"
            class="drop_item"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <img src alt />
              欢迎{{nickName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid" command="user_info">个人信息</el-dropdown-item>
              <el-dropdown-item command="sign_out">
                <span class="iconfont iconexittuichu"></span>退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-menu-item index="5" v-else-if="isSignIn===1">
            <router-link
              :class="[activeIndex==5?'meBtnOn':'meBtnOff']"
              to="/home"
            >{{nickName}}</router-link>
          </el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStore, getCookie, deleteCookie } from "@/utils";
import { postSignout } from "@/api";
export default {
  data() {
    return {
      nav_isshow: false,
    };
  },
  methods: {
    async handleCommand(command) {
      if (command == "user_info") {
        console.log("个人信息");
      } else if (command == "sign_out") {
        let res = await postSignout({
          username: getStore("u_n"),
          token: getCookie("_t"),
        });
        if (res.data.status === 1) {
          deleteCookie("_t");
          this.$store.commit("changeIsSignIn", 0);
          this.$store.commit("changeIndex", "1");
          localStorage.clear();
          this.$router.replace({ name: "home" });
        }
      }
    },
    go_index() {
      this.$router.push({ path: "/" });
    },
    dropdown() {
      this.nav_isshow = !this.nav_isshow;
    },

    handleSelect(key, keyPath) {
      this.$store.commit("changeIndex", key);
    },
  },
  mounted() {},
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    nickName() {
      return localStorage.getItem("nickName");
    },
    avatar() {
      return localStorage.getItem("avatar");
    },
  },
};
</script>

<style scoped>
.user_info {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.user_img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-bottom: 1.25rem;
}
.user_img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.iconexittuichu {
  margin-right: 0.625rem;
}
.drop_item {
  float: right;
  height: 2.75rem;
  line-height: 2.75rem;
  margin-right: 3.75rem;
  color: #fff;
}
.nav_mob_drop_logo {
  width: 100%;
  height: 3.25rem;
}
.nav_mob_drop_logo > img {
  width: 100%;
  height: 100%;
}
.nav_mob_drop {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-position: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}
.nav_mob_drop_ul {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  width: 60%;
  height: 80%;
}
.nav_mob_drop_ul > li .iconcha {
  font-size: 2rem;
}
.nav_mob_drop_ul > li {
  font-size: 1.25rem;
  margin-top: 1.75rem;
}
.nav_mob_drop_ul > li > a {
  font-weight: bold;
  color: #1989fa;
}
/* .header_right_warp {
  width: 100%;
  height: 2.75rem;
  background: #000;
}
.header_right {
  float: right;
  margin-right: 3.125rem;
} */
.header {
  position: fixed;
  width: 100vw;
  height: 2.75rem;
  top: 0;
  z-index: 3000;
}
.logo {
  background: #000;
  padding: 0px 60px;
}
.logo_img {
  display: flex;
  align-items: center;
  background: #000;
  color: #fff;
  height: 2.75rem;
  padding-left: 1.875rem;
  background-image: url("../assets/images/logo.png");
  /* background:#000; */
  background-size: 80% 60%;
  background-repeat: no-repeat;
  background-position: center;
}
.nav_pc {
  width: 100%;
  background: #000;
  color: #fff;
  height: 2.75rem;
}
.nav_pc li {
  display: flex;
  align-items: center;
  height: 100%;
}
.nav_pc li a {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}
.nav_pc li a i {
  /* font-size: .75rem; */
  margin-right: 0.625rem;
}
.nav-mob {
  background: #000;
  color: #fff;
  height: 2.75rem;
}
.nav_btnlogo {
  display: flex;
  height: 100%;
  width: 3.25rem;
  align-items: center;
  justify-content: center;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(1.25rem);
  opacity: 0;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
