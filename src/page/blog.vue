<template>
  <div>
    <top></top>
    <div class="page">
      <img :src="info.filename" alt />
      <div class="info_body">
        <div class="title">{{info.title}}</div>
        <div class="time">{{info.timestamp}}</div>
        <mavon-editor
          v-model="info.content"
          default_open="preview"
          :toolbarsFlag="false"
          :subfield="false"
          defaultOpen="preview"
          class="ddd"
        ></mavon-editor>
      </div>
      <div class="tiaozhuang">
        <div class="anniu">
          <span class="tiaozhuang_anniu" @click="prevv(info.prev._id)">上一篇</span>
          <span class="tit">{{prev?prev:'没有更多'}}</span>
        </div>
        <div class="anniu">
          <span class="tiaozhuang_anniu" @click="nextt(info.next._id)">下一篇</span>
          <span class="tit">{{next?next:'没有更多'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import top from "../components/top";
import { timestampToTime, checkLastTime } from "@/utils";
export default {
  data() {
    return {
      content: "15464sa",
      loading: true,
      info: {},
      page: 0,
      blog: [],
      id: this.$route.query.id,
      yema: 0,
      prev: "",
      next: ""
    };
  },
  components: {
    top
  },

  mounted() {
    this.getBlog(this.id);
  },
  methods: {
    getBlog(_id) {
      axios({
        url: "http://106.12.172.79:8088/api/studylogDetail",
        method: "post",
        data: { id: _id }
      }).then(res => {
        res.data.timestamp = timestampToTime(res.data.timestamp);
        this.info = res.data;
        console.log(res);
        console.log(res.data.prev);
        this.prev = res.data.prev.title;
        this.next = res.data.next.title;
      });
    },
    // getBlogList() {
    //   axios({
    //     url: "http://106.12.172.79:8088/api/studylogList",
    //     method: "post",
    //     data: { page: this.page }
    //   }).then(res => {
    //     res.data.forEach((item, index) => {
    //       item.timestamp = timestampToTime(item.timestamp);
    //       // item.timestamp = checkLastTime(item.timestamp);
    //     });

    //     this.blog = res.data;

    //     console.log(this.blog);
    //     this.blog.findIndex((v, index) => {
    //       if (v._id == this.$route.query.id) {
    //         this.yema = index;
    //       }
    //     });
    //     console.log(this.yema);

    //     // 页面跳转的文字显示
    //     if (this.yema == 0) {
    //       this.left_title = "没有更多了";
    //     } else {
    //       this.left_title = this.yema - 1 == -1 ? "没有更多了" : this.blog[this.yema-1].introduction;
    //     }

    //     if(this.yema == this.blog.length-1){this.right_title ="没有更多了"}
    //     else{
    //       this.right_title = this.yema  == this.blog.length-1 ? "没有更多了" : this.blog[this.yema+1].introduction;
    //     }

    //   });
    // },

    prevv(id) {
      if (id==undefined) {
        return;
      }
      this.$router.push({ path: "/blog", query: { id: id } });
      this.getBlog(id);
      console.log(id)
    },

    nextt(id) {
      if (id==undefined) {
        return;
      }
      this.$router.push({ path: "/blog", query: { id: id } });
      this.getBlog(id);
    }
  }
};
</script>

<style scoped>
.page {
  max-width: 740px;
  height: 1111px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;
}

.ddd {
  z-index: 1;
}
img {
  display: table-cell;
  vertical-align: middle;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0 1rem 0;
}
.title {
  text-align: center;
  margin: 1.25rem 0;
  font-size: 2.25rem;
  font-weight: 700;
}
.info_body {
  overflow: hidden;
  /* max-width: 740px;
    margin: 0 auto;
    padding: 0 2.5rem 0; */
  box-shadow: 0 0 10px rgba(106, 115, 125, 0.6);
  text-align: center;
}
.tiaozhuang {
  display: flex;
  justify-content: space-between;
}
.tiaozhuang div {
  flex: 1;
  text-align: center;
}
.tiaozhuang_anniu {
  cursor: pointer;
}
.anniu {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.anniu span {
  flex: 1;
}
.anniu .tit {
  padding-top: 1rem;
  color: #7f7f7f;
  font-size: 12px;
}
/* @media screen and (max-width:720px){
  .page {
  padding-left:6.5rem;
  padding-right:6.5rem
  }

} */
</style>