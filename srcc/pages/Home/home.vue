<template>
  <div class="home">
    <div class="home_warp">
      <el-row>
        <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="swiper">
            <van-swipe :autoplay="3000" height="300">
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
              </van-swipe-item>
            </van-swipe>
          </div>
        </el-col>
        <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
          <!-- <div class="swiper">
            <div v-swiper:mySwiper="swiperOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" :key="banner" v-for="item in images">
                  <img :src="item" />
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev swiper-button-white"></div>
              <div class="swiper-button-next swiper-button-white"></div>
            </div>
          </div>-->
          <div class="swiper">
            <van-swipe :autoplay="3000" height="150">
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
              </van-swipe-item>
            </van-swipe>
          </div>
        </el-col>
      </el-row>
      <div class="lists_warp">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <blog-list :bloglistarr="bloglistarr" :isnobloglist="isnobloglist"></blog-list>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <program-list :studylistarr="studylistarr" :isnoprogramlist="isnoprogramlist"></program-list>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="page_paging">
              <el-pagination
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next,jumper"
                :total="totle"
                :page-size="2"
              ></el-pagination>
            </div>
          </el-col>
          <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
            <div class="mobile_paging">
              <van-pagination
                v-model="currentPage"
                :total-items="totle"
                items-per-page="2"
                force-ellipses
                @change="mobileCurrentChange"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <div
        class="loading"
        v-if="loading"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      ></div>
    </div>
  </div>
</template>
<script>
import { checkSign } from "#/js/public";
import BlogList from "@/pages/Home/blogList";
import ProgramList from "@/pages/Home/programList";
import { timestampToTime, checkLastTime } from "@/utils";
import { getStudylogList, getBlogList } from "@/api";
export default {
  name: "home",
  data() {
    return {
      studylistarr: [],
      bloglistarr: [],
      isnobloglist: false,
      isnoprogramlist: false,
      currentPage: 0,
      loading: false,
      activeIndex: "1",
      articleList: [],
      studytotle: "",
      blogtotle: "",
      totle: -1,
      images: [
        "http://127.0.0.1:8088/uploads/studyimg/1599894236242.png",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599493247640&di=bb9bdde6307d37d89d7854a4894a477c&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F14ce36d3d539b6002ac5706de850352ac75cb7e4.jpg",
      ],
      swiperOption: {
        // pagination: {
        //   el: ".swiper-pagination",
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // clickable: true, // 允许点击小圆点跳转
        autoplay: {
          delay: 1000,
          disableOnInteraction: false, // 手动切换之后继续自动轮播
        },
        loop: true,
        preventClicksPropagation: true,
        observer: true, // 动态检查器,自动初始化swiper,默认为false
        observerParents: true,
      },
    };
  },
  components: { ProgramList, BlogList },
  computed: {},
  mounted() {},
  methods: {
    message() {
      this.$notify({
        title: "成功",
        message: "欢迎进入主页面",
        type: "success",
        center: true,
        duration: 1500,
        offset: 100,
      });
    },
    async getStudylogList(page) {
      let res = await getStudylogList({ type: "home", page: page });
      this.studylistarr = res.data.data;
      this.studytotle = parseInt(res.data.totle);
      if (this.studytotle >= this.blogtotle) {
        this.totle = parseInt(this.studytotle);
      } else {
        this.totle = parseInt(this.blogtotle);
      }
      if (this.studylistarr.length > 0) {
        this.isnoprogramlist = true;
      } else {
        this.isnoprogramlist = false;
      }
      res.data.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
      });
    },
    async getBlogList(page) {
      let res = await getBlogList({ type: "home", page: page });
      this.bloglistarr = res.data.data;
      this.blogtotle = parseInt(res.data.totle);
      if (this.studytotle >= this.blogtotle) {
        this.totle = parseInt(this.studytotle);
      } else {
        this.totle = parseInt(this.blogtotle);
      }
      if (this.bloglistarr.length > 0) {
        this.isnobloglist = true;
      } else {
        this.isnobloglist = false;
      }
      res.data.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
      });
    },
    // 移动端分页
    mobileCurrentChange(page) {
      this.currentPage = page;
      this.loading = true;
      setTimeout(async () => {
        await this.getStudylogList(page - 1);
        await this.getBlogList(page - 1);
        this.loading = false;
      }, 1000);
    },
    // PC端分页
    handleCurrentChange(page) {
      this.loading = true;
      setTimeout(async () => {
        await this.getStudylogList(page - 1);
        await this.getBlogList(page - 1);
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.getBlogList(0);
    this.getStudylogList(0);
    this.message();
  },
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  margin: 20px auto;
  padding: 0 1.25rem;
  border-radius: 1.25rem;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.mobile_paging {
  margin: 1.25rem 0;
}

.page_paging {
  display: flex;
  justify-content: center;
}
.lists_warp {
  margin-top: 1.25rem;
}
.home_warp {
  margin: 0 auto;
  padding: 15px 280px;
}
.swiper {
  /* width: 70%; */
  margin: 0px auto;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.swiper-slide {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.home {
  margin-top: 2.75rem;
}

@media screen and (max-width: 767px) {
  .home_warp {
    margin: 0 auto;
    padding: 0;
  }
  .swiper {
    margin: 20px auto;
    padding: 0 1.25rem;
    height: 9.375rem;
    border-radius: 1.25rem;
    box-sizing: border-box;
    overflow: hidden;
  }
}
@media screen and (max-width: 992px) {
  .home_warp {
    width: 80%;
    margin: 0 auto;
    padding: 0;
  }
  .swiper {
    margin: 20px auto;
    padding: 0 1.25rem;
    height: 9.375rem;
    border-radius: 1.25rem;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
