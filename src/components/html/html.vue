<template>
  <div>
    <!-- <li class="abstract-item">
      <a href="#" class="tittle">WebSocket</a>
      <hr />
      <div class="item-label">
        <i class="iconfont icon-yonghu">
          <span>Wang1996</span>
        </i>
        <i class="iconfont icon-shijian">
          <span>2020-05-19</span>
        </i>
        <i class="iconfont icon-biaoqian">
          <span>HTTP</span>
        </i>
      </div>
    </li>
        <li class="abstract-item">
      <a href="#" class="tittle">WebSocket</a>
      <hr />
      <div class="item-label">
        <i class="iconfont icon-yonghu">
          <span>Wang1996</span>
        </i>
        <i class="iconfont icon-shijian">
          <span>2020-05-19</span>
        </i>
        <i class="iconfont icon-biaoqian">
          <span>HTTP</span>
        </i>
      </div>
    </li>
        <li class="abstract-item">
      <a href="#" class="tittle">WebSocket</a>
      <hr />
      <div class="item-label">
        <i class="iconfont icon-yonghu">
          <span>Wang1996</span>
        </i>
        <i class="iconfont icon-shijian">
          <span>2020-05-19</span>
        </i>
        <i class="iconfont icon-biaoqian">
          <span>HTTP</span>
        </i>
      </div>
    </li> -->
  </div>
</template>

<script>
import {request} from '../../utils/request'
export default {
  data() {
    return {
      name: 1,
      blog:[]
    };
  },
  created() {
      this.$emit('getLoading',false)
  },
  methods:{
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