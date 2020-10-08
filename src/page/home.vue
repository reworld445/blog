<template>
  <div>
    <top></top>
    <div class="home">
      <div class="cheng">
        <div class="home-box">
          <div class="home-blog"></div>
          <h1>Wang1996</h1>
          <p>个人邮箱reworld445@163.com</p>
        </div>
        <!-- 主要内容栏 -->
        <div class="home-blog-wrapper">
          <!-- 文章栏 -->
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
            <!-- 分页 -->
            <!-- <el-pagination layout="prev, pager, next" :total="50"></el-pagination> -->
          </ul>
          <!-- 头像个人信息栏 -->
          <div class="info-wrapper">
            <div class="personal-info-wrapper">
              <img :src="img" alt />
            </div>
            <h3 class="personal-name">Wang1996</h3>
            <div class="article-box">
              <div class="article">
                <h3 class="article-num">{{blog.length}}</h3>
                <h6>Article</h6>
              </div>
              <div class="article-tag">
                <h3 class="article-num">3</h3>
                <h6>Tag</h6>
              </div>
            </div>
            <hr />
            <!-- 分类栏 -->
            <div class="info-wrapper-category">
              <h4>
                <i class="iconfont icon-leimupinleifenleileibie2"></i> Category
              </h4>
              <ul class="category-wrapper" style="margin: 15px 0">
                <li class="category-item">
                  <router-link to="/categories/HTML" class="category-name">
                    <span>HTML</span>
                    <span class="category-num" :style="{'background': 'rgb'+this.color.htmlColor}">0</span>
                  </router-link>
                </li>
                <li class="category-item">
                  <router-link to="/categories/javascript" class="category-name">
                    <span>JavaScript</span>
                    <span class="category-num" :style="{'background': 'rgb'+this.color.httpColor}">{{javascript}}</span>
                  </router-link>
                </li>
                <li class="category-item">
                  <router-link to="/categories/VUE" class="category-name">
                    <span>VUE</span>
                    <span class="category-num" :style="{'background': 'rgb'+this.color.vueColor}">{{vue}}</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <hr />
            <!-- 标签栏 -->
            <h4>
              <i class="iconfont icon-biaoqian"></i> Tag
            </h4>
            <div class="tag">
              <router-link
                to="/tag"
                :style="{'background': 'rgb'+this.color.quanbu}"
                class="spann"
              >全部</router-link>
              <router-link
                to="/tag/javascript"
                :style="{'background': 'rgb'+this.color.httpTag}"
                class="spann"
              >JavaScript</router-link>
              <router-link
                to="/tag/html"
                :style="{'background': 'rgb'+this.color.htmlTag}"
                class="spann"
              >HTML</router-link>
              <router-link
                to="/tag/vue"
                :style="{'background': 'rgb'+this.color.vueTag}"
                class="spann"
              >VUE</router-link>
            </div>
            <!-- <input type="text" v-model="value"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import { getStudylogList } from "../api/index";
import { timestampToTime, checkLastTime } from "@/utils";

export default {
  data() {
    return {
      url: require("../assets/home-blog.png"),
      img: require("../assets/touxiang.png"),
      blog: [],
      page: 0,
      value:'',
      timer:null,
      // wnum,
      color: {
        httpColor: "",
        htmlColor: "",
        vueColor: "",
        quanbu: "",
        httpTag: "",
        htmlTag: "",
        vueTag: ""
      },
      javascript:0,
      vue:0
    };
  },
  components: {
    top
  },
   mounted() {

    this.randomColor();

    this.getStudylogListt(this.page)

  },

  methods: {
    rgb() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var rgb = "(" + r + "," + g + "," + b + ")";
      return rgb;
    },
    randomColor() {
      for (let key in this.color) {
        this.color[key] = this.rgb();
      }
    },

    blogt(id) {
      this.$router.push({ path: "/blog", query: { id: id } });
    },

    async getStudylogListt(page){
      let {data} = await getStudylogList({page})
      data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
      });
      this.blog = data;

      let res = await getStudylogList({page:1})
      console.log(res)
      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
      });
      this.blog = [...this.blog,...res.data];
      console.log(this.blog)
      this.blog.forEach(v=>{
        if(v.category[0]==='JavaScript'){this.javascript+=1}
        else if(v.category[0]==='Vue'){this.vue+=1}
      })

    },

    //  async getStudylogListt(page) {
    //     let res = await getStudylogList({ page: page });
    //     console.log(res)
    //  }

    // 节流
    // throttle(func, interval) {
    //   let timeout;
    //   let starttime = new Date();
    //   return function() {
    //     clearTimeout(timeout);
    //     let endtime = new Date();
    //     if (endtime - starttime <= interval) {
    //       timeout = setTimeout(() => {
    //         this.func();
    //       }, interval);
    //     } else {
    //       starttime = endtime;
    //       this.func();
    //     }
    //   };
    // },

    // dayin() {
    //   console.log(this.wnum++);
    // }
    getlist(){console.log(233)}
  },
  watch:{
    'value':{
      handler(v){
        if(this.timer){
          clearTimeout(this.timer)
        }else{
          this.timer = setTimeout(()=>{this.getlist()},2000)
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* nav{
    height:3.6rem
} */
hr {
  border: 0;
  border-top: 1px solid#eaeecf;
}
.home {
  padding-top: 3.6rem;
  margin: auto;
}
.home-box {
  height: 400px;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.home-blog {
  background: url("../assets/home-blog.png") center center / cover no-repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.home-blog:after {
  display: block;
  content: " ";
  position: absolute;
  background: #fff;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  opacity: 0.2;
}
.home-box h1 {
  margin: 7rem auto 1.8rem;
  font-size: 2.5rem;
  color: #fff;
  transition: all 0.25s ease-in-out 0.08s;
  transform: translateY(0px);
  opacity: 1;
}

.home-box p {
  margin: 1.8rem auto;
  font-size: 1.6rem;
  line-height: 1.3;
  color: #fff;
}
.home-blog-wrapper {
  display: flex;
  align-items: flex-start;
  margin: 20px auto 0;
  max-width: 1126px;
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
.blog-list {
  flex: auto;
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
  cursor: pointer;
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
.info-wrapper {
  position: sticky;
  top: 70px;
  transition: all 0.3s;
  margin-left: 15px;
  flex: 0 0 300px;
  height: auto;
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 0 15px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.personal-info-wrapper img {
  display: block;
  width: 8rem;
  height: 8rem;
  margin: 2rem auto;
  border-radius: 50%;
}
.personal-name {
  text-align: center;
  font-weight: 500;
  line-height: 1.25;
  font-size: 1.2rem;
  color: #242424;
}
.article-box {
  display: flex;
  text-align: center;
  margin-bottom: 1rem;
}
.article-box h6 {
  margin: 0;
  font-weight: 500;
  color: #242424;
  font-size: 0.67em;
}
.article-num {
  margin: 0 0 0.6rem;
  font-weight: 500;
  color: #242424;
  font-size: 1.2rem;
}
.article {
  flex: auto;
  border-right: 1px solid #000;
}
.article-tag {
  flex: auto;
}
.iconfont {
  font-size: 0.9rem;
  color: #7f7f7f;
}
.category-item {
  margin-bottom: 0.4rem;
  padding: 0.4rem 0.8rem;
  transition: all 0.5s ease 0s;
  border-radius: 0.25rem;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.category-item:hover {
  transform: scale(1.03, 1.03);
}
.category-name {
  display: flex;
  justify-content: space-between;
  line-height: 1.7;
  width: 100%;
}
.category-name-a {
  color: #3eaf7c;
  font-weight: 500;
}
.category-num {
  width: 1.6rem;
  height: 1.6rem;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 0.25rem;
  background: #eee;
  font-size: 0.6rem;
  color: #fff;
}
.tag {
  margin: 30px 0;
}
.tag .spann {
  vertical-align: middle;
  margin: 4px 4px 10px;
  padding: 4px 8px;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem;
  background: #fff;
  color: #fff;
  line-height: 13px;
  font-size: 13px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
}
.tag span:hover {
  transform: scale(1.08, 1.08);
}
@media screen and (max-width: 720px) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .home-box {
    margin: 0 -1.5rem;
  }
  .home-box h1 {
    margin: 6rem auto 1.8rem;
    font-size: 2rem;
  }
  .home-box p {
    font-size: 1.2rem;
  }
  .info-wrapper {
    display: none;
  }
}
</style>