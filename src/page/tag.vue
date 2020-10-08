<template>
  <div>
    <top></top>
    <div class="category-box">
      <ul class="category-wrapper">
        <li class="category-item">
          <router-link to="/tag" class="tiaozhuan" active-class="active-item" exact>
            <span class="category-name">全部</span>
          </router-link>
        </li>
        <li class="category-item">
          <router-link to="/tag/html" class="tiaozhuan" active-class="active-item">
            <span class="category-name">HTML</span>
          </router-link>
        </li>
        <li class="category-item">
          <router-link to="/tag/javascript" active-class="active-item" class="tiaozhuan">
            <span class="category-name">JavaScript</span>
          </router-link>
        </li>
        <li class="category-item">
          <router-link to="/tag/vue" active-class="active-item" class="tiaozhuan">
            <span class="category-name">VUE</span>
          </router-link>
        </li>
      </ul>
      <!-- 全部请求数据 -->
      <div v-show="this.$route.path=='/tag'">
          <ul class="blog-list">
            <li class="abstract-item" v-for="(item,index) in blog" :key="index">
              <span @click="blogt(item._id)" class="tittle">{{item.title}}</span>
              <hr />
              <div class="item-label">
                <i class="iconfont icon-yonghu">
                  <span>Wang1996</span>
                </i>
                <i class="iconfont icon-shijian">
                  <span>{{item.timestamp}}</span>
                </i>
                <i class="iconfont icon-biaoqian">
                  <span>{{item.category[0]}}</span>
                </i>
              </div>
            </li>
          </ul>
      </div>
      <router-view :blogList="blog"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import top from "../components/top";
import { timestampToTime, checkLastTime } from "@/utils"
function rgb() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = "(" + r + "," + g + "," + b + ")";
  return rgb;
}
export default {
  data() {
    return {
      color: {
        html: "",
        http: "",
        vue: ""
      },
      blog:[]
    };
  },
  components: {
    top
  },
  created() {
    axios({
      url:'http://106.12.172.79:8088/api/studylogList',
      method:'post',
      data:{page:this.page}
    }).then(res=>{

      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);

    })

      this.blog = res.data

    })
  },
  mounted() {
    this.randomColor();
    
  },
  methods: {
    randomColor() {
      for (let key in this.color) {
        this.color[key] = rgb();
      }
    },

    blogt(id){
      this.$router.push({path:'/blog',query:{id:id}})
    }

  }
};
</script>

<style scoped>
.category-box {
  max-width: 740px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;
}
.category-wrapper {
  display: flex;
  margin: 15px 0;
}
.category-item {
  vertical-align: middle;
  margin: 4px 4px 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 12px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  background-color: #fff;
}
.tiaozhuan {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 8px 14px;
  justify-content: space-between;
  align-items: center;
  color: #666;
}
.category-item:hover {
  color: #fff;
  background: #3eaf7c;
}
.tiaozhuan:hover {
  color: #fff;
}
.active-item {
  color: #fff;
  background: #3eaf7c;
}
.category-num {
  margin-left: 4px;
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  color: #fff;
  background: red;
}

/* 全部的样式 */
li {
  list-style: none;
}
.abstract-item {
  position: relative;
  margin: 0 auto 20px;
  padding: 16px 20px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  background-color: #fff;
  box-sizing: border-box;
}
.abstract-item:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
.tittle {
  position: relative;
  text-decoration: none;
  line-height: 36px;
  font-size: 1.28rem;
  line-height: 36px;
  color: #3eaf7c;
  font-weight: 650;
  padding-bottom: 5px;
}
.tittle::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0px;
  left: 0px;
  background-color: rgb(62, 175, 124);
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
.tittle:hover::after {
  width: 100%;
  /* border-bottom:1px solid #3eaf7c; */
  transform: scaleX(1);
  visibility: visible;
}
.iconfont span {
  margin-left: 0.5rem;
}
.item-label .iconfont {
  display: inline-block;
  margin-right: 1rem;
  font-size: 0.9rem;
  line-height: 1.5rem;
  color: #7f7f7f;
}
.item-label .iconfont:last-child {
  margin-right: 1rem;
}
hr {
  border: 0;
  border-top: 1px solid#eaeecf;
}
</style>
