<template>
  <!-- <div class="blog" :style="{backgroundImage:'url('+require('../assets/images/bg.png')+')',backgroundSize:'100% 100%'}"> -->
  <div class="blog">
    <!-- 头部 -->
    <common-header></common-header>

    <!-- 内容 -->
    <keep-alive>
      <transition name="slide-fade">
        <!-- <keep-alive> -->

        <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </keep-alive>

    <!-- 底部 -->
    <!-- <common-footer></common-footer> -->
  </div>
</template>
<script>
import CommonHeader from "@/components/commonHeader";
import commonFooter from "@/components/commonFooter";
export default {
  name: "blog",
  components: {
    CommonHeader,
    commonFooter,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style>
.blog {
  /* width: 100vw; */
  box-sizing: border-box;
  /* background: rgb(151, 157, 224);
  background: linear-gradient(
    153deg,
    rgba(151, 157, 224, 1) 0%,
    rgba(73, 171, 171, 1) 48%,
    rgba(62, 183, 209, 1) 100%
  ); */
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>
