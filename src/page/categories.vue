<template>
  <div class="category">
    <top></top>
    <div class="category-box">
      <ul class="category-wrapper">
        <li class="category-item">
          <router-link to="/categories/HTML" class="tiaozhuan" active-class="active-item">
            <span class="category-name">HTML</span>
            <span class="category-num" :style="{'background': 'rgb'+this.color.html}">0</span>
          </router-link>
        </li>
        <li class="category-item">
          <router-link to="/categories/javascript" active-class="active-item" class="tiaozhuan">
            <span class="category-name">JavaScript</span>
            <span class="category-num" :style="{'background': 'rgb'+this.color.http}">{{num}}</span>
          </router-link>
        </li>
        <li class="category-item">
          <router-link to="/categories/VUE" active-class="active-item" class="tiaozhuan">
            <span class="category-name">VUE</span>
            <span class="category-num" :style="{'background': 'rgb'+this.color.vue}">{{num1}}</span>
          </router-link>
        </li>
      </ul>
      <keep-alive include="vue">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import { getStudylogList } from "../api/index";
import { timestampToTime, checkLastTime } from "@/utils";
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
      loading: true,
      num: 0,
      num1: 0,
      page:0
    };
  },
  components: {
    top
  },
  created() {this.getStudylogListt(this.page)},
  mounted() {
    this.randomColor();
  },
  methods: {
    randomColor() {
      for (let key in this.color) {
        this.color[key] = rgb();
      }
    },
    getLoading(value) {
      this.loading = value;
    },
    async getStudylogListt(page) {
      let { data } = await getStudylogList({ page });
      this.blog = data;
      let res = await getStudylogList({ page: 1 });
      this.blog = [...this.blog, ...res.data];
      this.blog.forEach(v => {
        if (v.category[0] === "JavaScript") {
          this.num += 1;
        } else if (v.category[0] === "Vue") {
          this.num1 += 1;
        }
      });
    }
  }
};
</script>

<style scoped>
.category {
  height: 100vh;
}
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
  margin: 4px 4px 8px;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 13px;
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
</style>