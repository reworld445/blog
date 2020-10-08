<template>
  <div class="home_list">
    <div class="list_warp">
      <h3 class="list_title">最新文章</h3>
      <ul class="home_list_ul">
        <el-row>
          <el-col
            :xs="24"
            :sm="8"
            :md="8"
            :lg="8"
            :xl="8"
            v-for="(item,index) in homelist"
            :key="index"
          >
            <li class="home_list_li">
              <div class="li_img">
                <img :src="item.filename" alt />
              </div>
              <div class="li_item">
                <div class="item_title">{{item.title}}</div>
                <div class="item_time">{{item.timestamp}}</div>
                <p class="item_info">{{item.introduction}}</p>
                <div class="read_more">阅读更多</div>
              </div>
            </li>
          </el-col>
        </el-row>
      </ul>
    </div>
    <div class="home_bottom" id="home_bottom">
      <div class="bottom_title">WEB.PROGRAMMER.乐少涛.Blog</div>
      <div class="go_about" @click="go_about()">About Me</div>
    </div>
  </div>
</template>
<script>
import { getStudylogList } from "@/api";
import { timestampToTime, checkLastTime } from "@/utils";
export default {
  name: "homeList",
  components: {},
  data() {
    return {
      homelist: [],
    };
  },
  components: {},
  methods: {
    async getStudylogList(page) {
      let res = await getStudylogList({ page: page });
      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
        // item.timestamp = checkLastTime(item.timestamp);
      });
      // this.homelist = this.homelist.concat(res.data);
      this.homelist = res.data.slice(0, 3);
    },
    go_about() {
      this.$router.push({ path: "/about", query: {} });
    },
  },
  created() {
    this.getStudylogList(0);
  },
};
</script>

<style scoped>
.bottom_title {
  font-size: 1.875rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.home_bottom {
  padding: 1.875rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}
.go_about {
  color: #fff;
  margin-top: 1.875rem;
  background: #1e9fff;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
}
.read_more {
  margin-top: 0.9375rem;
  font-size: 0.875rem;
  color: #29b6f6;
}
.item_info {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item_time {
  font-size: 0.75rem;
  color: #bbb;
  margin-bottom: 0.9375rem;
}
.li_item {
  display: flex;
  padding: 1.25rem 0.625rem;
  flex-direction: column;
}
.item_title {
  margin-bottom: 0.625rem;
}
.home_list {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-image: url("../../assets/images/home2bg.jpg");
  background-size: 100% 100%;
  background-position: center;
  box-sizing: border-box;
}
.list_title {
  position: relative;
  font-size: 1.875rem;
  padding-bottom: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1.875rem;
}
.list_title::after {
  position: absolute;
  width: 50px;
  height: 2px;
  content: "";
  left: 50%;
  bottom: -1px;
  background: #00c2ff;
  transform: translate(-50%, 0);
}
.list_warp {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  padding: 1.875rem;
}
.li_img {
  width: 100%;
  height: 12.5rem;
}
.li_img > img {
  width: 100%;
  height: 100%;
}
.home_list_ul {
  display: flex;
  justify-content: center;
  align-items: center;
}
.home_list_li {
  display: flex;
  justify-content: center;
  padding: 1.25rem;
  margin-top: 1.25rem;
  flex-direction: column;
}
.home_list_li:hover {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.4); */
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
    transform: scale(1.02); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.2); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
}
@media screen and (max-width: 767px) {
  .home_bottom {
    background-size: 100% 100%;
    background-position: center;
    background-image: url("../../assets/images/home2bg.jpg");
  }
  .bottom_title {
    font-size: 1.25rem;
  }
  .home_list_li {
    margin-top: 0;
    padding: 0px;
  }
  .li_img {
    height: 10rem;
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .list_title {
    margin-bottom: 1.25rem;
  }
}
</style>
