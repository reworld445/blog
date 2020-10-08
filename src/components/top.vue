<template>
  <header class="navbar">
    <div class="navbar-left">
      <!-- <img :src="img1" alt="raging" class="navbar-logo" /> -->
      <div class="nav-button" @click="sideber()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          viewBox="0 0 448 512"
          class="icon"
        >
          <path
            fill="currentColor"
            d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
          />
        </svg>
      </div>
      <router-link to="/" class="site-name" style="cursor:pointer;">Wang1996.Blog</router-link>
    </div>
    <div class="search-box">
      <el-input
        v-model="value"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="zzz"
        @keyup.enter.native="submit"
      ></el-input>
      <el-button @click="search">搜索</el-button>
    </div>
    <div class="links">
      <!-- 定义界面颜色 -->
      <!-- <a class="color-pricker" href="#">
        <a href="#" class="color-icon">
          <i class="iconfont icon-w_huapan"></i>
        </a>
        <div class="color-prick-menu">
          <h4 class="color-title">Choose mode</h4>
          <ul class="color-menu-options">
            <li>dark</li>
            <li>auto</li>
            <li>light</li>
          </ul>
        </div>
      </a>-->
      <!-- 搜索框 -->

      <!-- 小导航 -->
      <div class="nav-links">
        <a class="nav-item nav-home" href="#">
          <router-link to="/" active-class="home" class="nav-home" exact>
            <i class="iconfont icon-solid-home"></i> 主页
          </router-link>
        </a>
        <div class="nav-item nav-item-fen">
          <div class="nav-item-text">
            <a class="fenlei" @mouseenter="fenActive($event)" @mouseleave="removeActive($event)">
              <i class="iconfont icon-leimupinleifenleileibie2"></i> 分类
            </a>
            <span class="arrow-right"></span>
          </div>
          <ul
            class="nav-dropdown"
            v-show="fen"
            @mouseenter="fenBoxAcive($event)"
            @mouseleave="fenBoxRemove($event)"
          >
            <li class="dropdown-item">
              <router-link to="/categories/HTML" active-class="active">HTML</router-link>
            </li>
            <li class="dropdown-item">
              <router-link to="/categories/javascript" active-class="active">JavaScript</router-link>
            </li>
            <li class="dropdown-item">
              <router-link to="/categories/VUE" active-class="active">VUE</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <router-link to="/tag" active-class="tag" class="nav-home">
            <i class="iconfont icon-biaoqian"></i> 标签
          </router-link>
        </div>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <div class="sidebar" v-show="side">
        <h1 style="margin-top:2.6rem">Wang1996.blog</h1>
        <router-link to="/" class="small-nav" @click="sideber()">Home</router-link>
        <router-link to="/categories/VUE" class="small-nav" @click="sideber()">Category</router-link>
        <router-link to="/tag" class="small-nav" @click="sideber()">Tag</router-link>
        <div
          class="el-icon-close"
          style="font-size:2.5rem;margin-top:1rem;cursor: pointer;"
          @click="sideber()"
        ></div>
      </div>
    </transition>
  </header>
</template>

<script>
import axios from "axios";
import { timestampToTime, checkLastTime } from "@/utils";

export default {
  data() {
    return {
      img1: require("../assets/logo.png"),
      fen: false,
      side: false,
      sideWidth: 0,
      value: ""
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    changeActive($event) {
      $event.currentTarget.className = "active-nav active-nav .iconfont";
    },
    fenActive($event) {
      $event.currentTarget.className =
        "active-nav-fen active-nav-fen .iconfont";
      this.fen = true;
    },
    fenBoxAcive($event) {
      this.fen = true;
    },
    fenBoxRemove($event) {
      this.fen = false;
    },
    removeActive($event) {
      $event.currentTarget.className = "";
      this.fen = false;
    },
    sideber(event) {
      this.side = !this.side;
      // if (this.sideWidth == 0) {
      //   this.sideWidth = "16.4rem";
      // } else {
      //   this.sideWidth = 0;
      // }
      // // event.currentTarget.className='sideWidth'
      // this.$emit("bgc", this.side);
    },
    // 搜索功能
    search() {
      if (this.value === "") {
        this.$message({
          showClose: true,
          message: "请输入搜索内容",
          type: "error",
          duration: 1000,
          offset: 80
        });
        return;
      }
      this.$router.push(
        { path: "/search", query: { searchvalue: this.value } },
        () => {}
      );
    },
    submit() {
      console.log(11)
      if (this.value === "") {
        this.$message({
          showClose: true,
          message: "请输入搜索内容",
          type: "error",
          duration: 1000,
          offset: 80
        });
        return;
      }
      this.$router.push(
        { path: "/search", query: { searchvalue: this.value } },
        () => {}
      );
    }
  }
};
</script>

<style lang='less' scoped>
body {
  height: 3000px;
}
.navbar {
  box-sizing: border-box;
  height: 3.6rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 0.7rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  background: #fff;
  /* position: -webkit-sticky;
  top: 10px; */
}

.links {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
/* .navbar-logo {
  height: 2.2rem;
  min-width: 2.2rem;
  margin-right: 0.8rem;
  vertical-align: top;
  border-radius: 50%;
} */
.nav-button {
  cursor: pointer;
  display: none;
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  padding: 0.6rem;
  top: 0.6rem;
  left: 1rem;
}
.nav-button .icon {
  display: none;
  width: 1.25rem;
  height: 1.25rem;
}
.site-name {
  color: #303133;
  font-size: 1.2rem;
  line-height: 2.2rem;
}
.color-pricker {
  display: inline-block;
  position: relative;
  margin-right: 1.5rem;
}
.color-icon {
  display: inline-block;
}
.color-pricker .color-icon .iconfont {
  font-size: 1.4rem;
  color: #3eaf7c;
}
.color-prick-menu {
  display: none;
  position: absolute;
  left: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-width: 125px;
  margin: 0;
  padding: 1em;
  border-radius: 0.25rem;
}
.color-prick-menu .color-title {
  margin-bottom: 0.6rem;
  color: #303133;
  font-weight: 700;
}
.color-menu-options {
  display: flex;
}
.color-menu-options li {
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 6px;
}
/* .el-input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width:30%;
}

.el-input__icon {
  line-height: 32px;
  font-size: 16px;
} */
.search-box {
  display: flex;
}
.nav-links {
  height: 18px;
  display: -webkit-box;
  font-size: 0.9rem;
  color: #242424;
}
.nav-item {
  display: inline-block;
  margin-left: 1.4rem;
  cursor: pointer;
}
.nav-item-fen {
  position: relative;
}
.nav-item-text {
  display: inline-block;
}
.nav-item a {
  display: inline-block;
  padding-bottom: 3px;
  box-sizing: border-box;
}
.arrow-right {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #7f7f7f;
  border-bottom: 0;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 0.4rem;
}

.nav-dropdown {
  height: auto !important;
  box-sizing: border-box;
  max-height: calc(100vh - 2.7rem);
  overflow-y: auto;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  padding: 0.6rem 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  text-align: left;
  border-radius: 0.25rem;
  white-space: nowrap;
  margin: 0;
}
.dropdown-item {
  line-height: 1.7rem;
}
.dropdown-item a {
  display: block;
  line-height: 1.7rem;
  position: relative;
  border-bottom: none;
  font-weight: 400;
  margin-bottom: 0;
  padding: 0 1.5rem 0 1.25rem;
}
.dropdown-item a:hover {
  color: #3eaf7c;
}
.active {
  color: #3eaf7c;
}
.nav-home {
  color: #242424;
  margin-left: 0;
}
/* .nav-item .iconfont {
  color: #7f7f7f;
} */
.nav-item .nav-home:hover {
  color: #3eaf7c;
  border-bottom: 2px solid #3eaf7c;
}
/* 滑入变色 */

.nav-itema {
  color: #000;
}
.active-nav {
  color: #3eaf7c;
  border-bottom: 2px solid #3eaf7c;
}
.active-nav-fen {
  color: #3eaf7c;
}
.active-nav .iconfont {
  color: #3eaf7c;
}
.active-nav-fen .iconfont {
  color: #3eaf7c;
}
.home {
  color: #3eaf7c;
  border-bottom: 2px solid #3eaf7c;
}

.tag {
  color: #3eaf7c;
  border-bottom: 2px solid #3eaf7c;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  z-index: 1;
  width: 100%;
  margin: 0;
  top: 3.6rem;
  left: 0;
  bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* opacity: 0.6; */
  box-sizing: border-box;
  overflow-y: auto;
  transition: all 0.5s ease 0s;
  color: #fff;
}
.sideWidth {
  width: 20rem;
}
.small-nav {
  font-size: 1.2rem;
  color: #1989fa;
  margin: 2rem 0;
}
@media screen and (max-width: 720px) {
  .nav-button,
  .nav-button .icon {
    display: block;
  }
  .links {
    display: none;
  }
  .site-name {
    display: none;
  }
}

@media screen and (min-width: 720px) {
  .sidebar {
    display: none;
  }
}
.zzz/deep/.el-input__inner {
  height: 28px;
  padding-right: 30px;
}

.zzz/deep/.el-input__prefix {
  top: -6px;
}
</style>