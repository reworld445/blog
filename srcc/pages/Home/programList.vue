<template>
  <div class="program_list">
    <div class="title">学习笔记</div>
    <div class="list_warp">
      <ul class="list_ul">
        <li v-for="(item,index) in studylistarr" :key="index" class="list_li">
          <div class="havelist" v-if="isnoprogramlist">
            <div class="list_img">
              <img :src="item.filename" alt />
            </div>
            <div class="list_info">
              <div class="li_title">{{item.title}}</div>
              <div class="li_time">{{item.timestamp}}</div>
              <p class="li_introduction">{{item.introduction}}</p>
              <div class="read_more">阅读更多</div>
            </div>
          </div>
        </li>
        <div class="nolist" v-if="!isnoprogramlist">
          <van-empty description="我没有数据啦!" />
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
// import { getStudylogList } from "@/api";
// import { timestampToTime, checkLastTime } from "@/utils";
export default {
  name: "program_list",
  data() {
    return {};
  },
  props: {
    studylistarr: Array,
    isnoprogramlist: Boolean,
  },
  computed: {},
  mounted() {},
  watch: {
    studylistarr: function (v) {
      this.studylistarr = v;
    },
    isnoprogramlist: function (v) {
      this.isnoprogramlist = v;
    },
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.li_title {
  margin-bottom: 0.625rem;
}
.li_time {
  font-size: 0.75rem;
  color: #bbb;
  margin-bottom: 0.9375rem;
}

.read_more {
  margin-top: 0.9375rem;
  font-size: 0.875rem;
  color: #29b6f6;
}
.li_introduction {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.program_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.title {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 3px solid #51cbce;
}
.list_warp {
  width: 100%;
}
.list_ul {
  margin-top: 1.25rem;
}
.list_li {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  padding: 0 1.25rem;
}
.list_li:hover {
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
.list_img {
  width: 100%;
  height: 10.5rem;
}
.list_img > img {
  border-radius: 0.625rem;
  width: 100%;
  height: 100%;
}
.list_info {
  padding: 15px 20px;
}
</style>
