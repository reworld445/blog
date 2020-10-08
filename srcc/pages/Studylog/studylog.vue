<template>
  <!-- 程序学习日记 -->
  <div class="studylog">
    <div class="studylog_warp">
      <el-row>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="studylog_list">
            <template>
              <div class="infinite-list-wrapper" style="overflow:auto">
                <ul class="studylog_ul">
                  <li
                    v-for="(item,index) in studylogList"
                    :key="index"
                    class="studylog_li"
                    @click="gostudy_detail(item)"
                  >
                    <h3 class="li_title">{{item.title}}</h3>
                    <div class="li_content">
                      <div class="li_img">
                        <img :src="item.filename" alt />
                      </div>
                      <div class="li_introduction">
                        <div class="li_introduction_warp">{{item.introduction}}</div>
                      </div>
                    </div>
                    <div class="li_floor">
                      <div class="li_time">{{item.timestamp}}</div>
                      <div class="biaoqian">
                        <i class="iconfont iconbiaoqian"></i>
                        <ul class="ul_category">
                          <li v-for="(v,i) in item.category" :key="i">{{v}}</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
                <el-row
                  style="height: 60px"
                  v-if="loading"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.3)"
                ></el-row>
                <p v-if="noMore">没有更多了</p>
              </div>
            </template>
          </div>
        </el-col>
        <el-col :xs="0" :sm="8" :md="8" :lg="8" :xl="8">
          <study-category v-on:update="updatelist"></study-category>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import StudyCategory from "@/pages/Studylog/StudyCategory";
import { timestampToTime, checkLastTime } from "@/utils";
import { getStudylogList } from "@/api";
export default {
  name: "studylog",
  components: {},
  data() {
    return {
      studylogList: [],
      page: 0,
      loading: false,
      scrollbarTotal: 0,
      isShow: false, // 返回顶部按钮隐藏 / 底部广告出现
      moreFlag: true, // 为true, 代表可以请求更多
    };
  },
  computed: {
    noMore() {
      return this.studylogList.length >= this.scrollbarTotal;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    message() {
      this.$notify({
        title: "成功",
        message: "欢迎进入学习页面",
        type: "success",
        center: true,
        duration: 1500,
        offset: 100,
      });
    },
    async getStudylogList(page) {
      let res = await getStudylogList({ page: page });
      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
        item.timestamp = checkLastTime(item.timestamp);
      });
      if (res.data != null) {
        this.scrollbarTotal = res.data.total;
        this.studylogList = this.studylogList.concat(res.data);
      }
    },
    gostudy_detail(item) {
      this.$router.push({ path: "/studylogDetail", query: { id: item._id } });
    },
    updatelist(item) {
      this.studylogList = item;
    },
  },
  components: {
    StudyCategory,
  },
  created() {
    this.message();
    this.getStudylogList(0);
  },
  mounted() {
    document.addEventListener("scroll", async () => {
      if (
        window.screen.height + document.documentElement.scrollTop >=
          document.body.clientHeight &&
        this.moreFlag
      ) {
        this.moreFlag = false;
        this.page++;
        // this.loading = true;
        await this.getStudylogList(this.page);
        this.$nextTick(() => {
          this.moreFlag = true;
          // this.loading = false;
        });
      }
    });
  },
};
</script>

<style scoped>
.infinite-list-wrapper p {
  text-align: center;
}
.infinite-list {
}

.li_time {
  font-size: 0.75rem;
  color: #787977;
}

.studylog {
  margin-top: 2.75rem;
}
.studylog_warp {
}
.studylog_ul {
  /* background: red; */
  padding: 1.25rem;
  border-radius: 0.9375rem;
}
.li_floor {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
}
.studylog_li {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  height: 14.5rem;
  box-sizing: border-box;
  padding-bottom: 0rem;
  border-radius: 0.9375rem;
  background: #e2e2e200;
  box-shadow: -8px 8px 9px #e2e2e0, 8px -8px 9px #fefefc;
  box-sizing: border-box;
}
.studylog_li:hover {
  animation: mymove 3s infinite;
  -webkit-animation: mymove 3s infinite; /*Safari and Chrome*/
  animation-direction: alternate; /*轮流反向播放动画。*/
  animation-timing-function: ease-in-out; /*动画的速度曲线*/
  /* Safari 和 Chrome */
  -webkit-animation: mymove 3s infinite;
  -webkit-animation-direction: alternate; /*轮流反向播放动画。*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
}
@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.01); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.01);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}
.li_content {
  display: flex;
  height: 6.875rem;
  /* margin-bottom: 0.9375rem; */
  padding-bottom: 0.9375rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.li_img {
  /* position: absolute; */
  width: 12.5rem;
  height: 6.875rem;
}
.li_img > img {
  width: 100%;
  height: 100%;
}
.li_title {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.09375rem;
  margin-bottom: 1.25rem;
}
.li_introduction {
  flex: 1;
  margin-left: 1.25rem;
  line-height: 1.25rem;
  font-size: 0.875rem;
  color: rgb(81, 82, 80);
}
.li_introduction_warp {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.biaoqian {
  display: flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  background: #f1f2f0;
  color: rgb(81, 82, 80);
}
.biaoqian > .iconbiaoqian {
}
.biaoqian:hover {
  background: #6bc30d;
  color: #f1f2f0;
}
.ul_category {
  display: flex;
  margin-left: 0.625rem;
  justify-content: space-around;
  align-items: center;
  font-size: 0.875rem;
}
.ul_category > li {
  margin-right: 0.625rem;
}
</style>
