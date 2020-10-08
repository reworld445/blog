<template>
  <div>
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
  </div>
</template>

<script>
import axios from 'axios'
import { timestampToTime, checkLastTime } from "@/utils"
export default {
  data() {
    return {
      name: 1,
      blog:[],
      loading:false
    };
  },
  created() {
    axios({
      url:'http://106.12.172.79:8088/api/categorylist',
      method:'post',
      data:{name:'study',type:'Vue'}
    }).then(res=>{

      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
        // item.timestamp = checkLastTime(item.timestamp);
      })

      this.blog = res.data
      this.$emit('num1',this.blog.length)
    })
  },
  methods:{
    blogt(id){
      this.$router.push({path:'/blog',query:{id:id}})
    }
  }
};
</script>

<style scoped>
li{
    list-style: none
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
.abstract-item:hover{
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
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
hr{
  border: 0;
  border-top: 1px solid#eaeecf;
}
</style>