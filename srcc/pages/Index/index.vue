<template>
  <div class="home">
    <div class="home_warp">
      <div class="home_pc">
        <div class="iconfont icontubiaozhizuo-" @click="go_next()">
          <!-- <el-backtop target=".study_warp"></el-backtop> -->
        </div>

        <div class="home_nav">
          <el-button @click="drawer = true" type="primary">
            <i class="iconfont iconai-kind"></i>
          </el-button>
          <el-row>
            <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
              <div class="pc_nav">
                <el-drawer
                  :visible.sync="drawer"
                  :direction="direction"
                  custom-class="pc_nav_warp"
                  size="20%"
                >
                  <div class="pc_nav_logo">
                    <img src="../../assets/images/logo1.png" alt />
                  </div>
                  <ul class="pc_nav_ul">
                    <li>
                      <router-link to="/home">Home</router-link>
                    </li>
                    <li>
                      <router-link to="/blog">Blog</router-link>
                    </li>
                    <li>
                      <router-link to="/studylog">Program</router-link>
                    </li>
                    <li>
                      <router-link to="/about">About Me</router-link>
                    </li>
                    <li>
                      <router-link to="/signin">Sign In</router-link>
                    </li>
                  </ul>
                  <div class="pc_nav_bg">
                    <div class="pc_nav_bg_warp1"></div>
                    <div
                      class="pc_nav_bg_warp2"
                    >Great success is an accumulation of smaller successes.</div>
                  </div>
                </el-drawer>
              </div>
            </el-col>
            <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
              <div class="pc_nav">
                <el-drawer
                  :modal="flag"
                  :visible.sync="drawer"
                  :direction="direction"
                  custom-class="pc_nav_warp"
                  size="70%"
                >
                  <div class="pc_nav_logo">
                    <img src="../../assets/images/logo1.png" alt />
                  </div>
                  <ul class="pc_nav_ul">
                    <li>
                      <router-link to="/home">Home</router-link>
                    </li>
                    <li>
                      <router-link to="/blog">Blog</router-link>
                    </li>
                    <li>
                      <router-link to="/studylog">Program</router-link>
                    </li>
                    <li>
                      <router-link to="/about">About Me</router-link>
                    </li>
                    <li>
                      <router-link to="/signin">Sign In</router-link>
                    </li>
                  </ul>
                  <div class="pc_nav_bg">
                    <div class="pc_nav_bg_warp1"></div>
                    <div
                      class="pc_nav_bg_warp2"
                    >Great success is an accumulation of smaller successes.</div>
                  </div>
                </el-drawer>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="main">
          <div class="author_name">乐少涛</div>
          <div class="motto">just do it</div>
          <el-row>
            <el-button
              size="mini"
              @click="goblog()"
              v-loading.fullscreen.lock="fullscreenLoading"
              :loading="fullscreenLoading"
              element-loading-background="rgba(0,0,0,0.5)"
              element-loading-text="正在加载中..."
            >GO</el-button>
          </el-row>
        </div>
      </div>
      <div class="study_warp" id="study_warp">
        <index-list></index-list>
      </div>
    </div>
  </div>
</template>
<script>
import IndexList from "@/pages/Index/indexList";
export default {
  name: "home",
  components: {},
  data() {
    return {
      flag: false,
      drawer: false,
      direction: "ltr",
      fullscreenLoading: false,
    };
  },
  components: {
    IndexList,
  },
  methods: {
    go_next() {
      document.getElementById("study_warp").scrollIntoView({
        behavior: "smooth",
      });
    },
    goblog() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.$router.push({
          path: "/home",
          query: {},
        });
      }, 1500);
    },
  },
  created() {},
};
</script>

<style scoped>
.pc_nav_bg {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 400px;
  background-image: linear-gradient(to bottom, rgb(255, 255, 255), #000);
  /* background:rgba(0, 0, 0,0.85); */
}
.pc_nav_bg_warp1 {
  position: absolute;
  background-image: url("../../assets/images/img1.jpg");
  background-size: 100% 100%;
  background-position: center;
  right: 0;
  top: 4.375rem;
  width: 80%;
  height: 30%;
}
.pc_nav_bg_warp2 {
  font-size: 1.25rem;
  color: #fff;
  position: absolute;
  bottom: 5rem;
  left: 1.875rem;
  width: 80%;
}
.pc_nav_logo {
  width: 100%;
  padding: 0 1.25rem;
}
.pc_nav_logo > img {
  width: 100%;
}
.pc_nav_ul {
  padding: 20px;
}
.pc_nav_ul > li {
  /* border-left: 3px solid #1e9fff; */
  padding-left: 15px;
  margin-top: 1.25rem;
  font-size: 20px;
  font-weight: bold;
}

.study_warp {
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-button--mini:hover {
  border-color: #fff;
  color: #606266;
}
.el-button--primary:focus,
.el-button--primary:hover {
  border: none;
  background: none;
}
.home_pc {
  position: relative;
  height: 100vh;
  background-image: url("../../assets/images/bg.jpg");
  /* background:#000; */
  background-size: 100% 100%;
  background-position: center;
}

.home_pc > .icontubiaozhizuo- {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  color: #fff;
  font-size: 40px;
}
.motto {
  font-size: 12px;
  color: #fff;
  margin-bottom: 10px;
}
.main {
  position: absolute;
  right: 5%;
  bottom: 5%;
  /* transform: translate(-50%, -50%); */
  text-align: center;
}
.el-drawer__header > span {
  outline: none;
}
.el-drawer__container {
  outline: none;
}
.el-drawer__close-btn {
  outline: none;
}
.el-button--primary {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  /* background: #fff; */
}
.el-button--primary:hover {
  background: #fff;
  color: #000;
}
.author_name {
  color: #fff;
  font-size: 30px;
  margin-bottom: 10px;
}
@media screen and (max-width: 767px) {
  .home_pc {
    position: relative;
    height: 100vh;
    background-image: url("../../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .pc_nav_bg {
    height: 40%;
  }
  .pc_nav_bg_warp1 {
    font-size: 0.75rem;
    top: 20%;
  }
  .pc_nav_bg_warp2 {
    font-size: 0.75rem;
    bottom: 20%;
  }
}
</style>
