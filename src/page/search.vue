<template>
  <div>
    <top></top>
    <!-- <search :value = this.$route.query.searchvalue></search> -->
    <div 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="height:100vh;z-index:1"
    >
    <div class="category-box">
      <ul class="blog-list" v-show="!show">
        <li class="abstract-item" v-for="(item,index) in blogList" :key="index">
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
      <div  v-show="show" class="nobox">
        <img src="https://img.yzcdn.cn/vant/custom-empty-image.png" style='margin-top:20px'/>
        <div style='color:#969799;margin-top:10px'>没有搜索到</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import top from "../components/top";
import search from "../components/search";
import { timestampToTime, checkLastTime } from "@/utils";
export default {
  data() {
    return {
      name: 1,
      blogList: [],
      show:false,
      loading:true
    };
  },
  components: {
    top,
    search
  },
  created() {
    this.loading = true
    axios({
      url: "http://106.12.172.79:8088/api/search",
      method: "post",
      data: { value: this.$route.query.searchvalue }
    }).then(res => {
      
      console.log(res.data.data);
      this.blogList = res.data.data;
      console.log(this.blogList);
      if(this.blogList.length===0){this.show=true,this.loading=false}
      else{this.show=false,this.loading=false}
    });
  },
  mounted(){

  },

  methods: {
    blogt(id) {
      this.$router.push({ path: "/blog", query: { id: id } });
    }
  },
  watch: {
    $route: {
      handler: function(aa) {
        this.loading = true
        axios({
          url: "http://106.12.172.79:8088/api/search",
          method: "post",
          data: { value: this.$route.query.searchvalue }
        }).then(res => {
          console.log(res.data.data);
          res.data.data.forEach(item=>{
            item.timestamp = timestampToTime(item.timestamp);
          })
          this.blogList = res.data.data;
          if(this.blogList.length===0){this.show=true,this.loading=false}
          else{this.show=false,this.loading=false}
        });

      }
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
.nobox{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction: column
}
</style>