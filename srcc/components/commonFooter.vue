<template>
  <footer>
    <div class="wrapper">
        这是我的底部
    </div>
    <transition name="slide-fade">
      <div v-if="isTop" class="toTop iconfont icon-top" @click="toTop"></div>
    </transition>
  </footer>
</template>
<script>


export default {
  data(){
    return{
      isTop:false,
      visit:486
    }
  },
  created(){
    window.addEventListener('scroll', this.scroll);
  },
  methods:{
    scroll:function(){
      let scroll=document.body.scrollTop || document.documentElement.scrollTop;
      if(scroll>100){
        this.isTop=true;
      }else{
        this.isTop=false;        
      }
    },
    toTop:function(){
      //Math.animation = function (from, to, duration, easing, callback) {}
      Math.animation(document.documentElement.scrollTop, 0,800,'Quart.easeOut', function (value) {
          document.documentElement.scrollTop = value;
          document.body.scrollTop = value;
      });
    }
  }
}
</script>

<style scoped>

</style>
