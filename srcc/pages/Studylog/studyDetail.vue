<template>
  <div class="studyDetail">
    <common-header></common-header>
    <el-row>
      <!-- pc -->
      <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="warp">
          <div class="head_image">
            <!-- :style="{backgroundImage: 'url('+ item.filename +')'}" -->
            <img :src="item.filename" alt />
          </div>
          <div class="info_body">
            <div class="title">{{item.title}}</div>
            <div class="time">{{time}}</div>
            <mavon-editor
              v-model="content"
              default_open="preview"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
            ></mavon-editor>
          </div>
          <div class="tab_archives">
            <div class="prev_archives" @click="togo(prev._id)">
              <div>上一篇</div>
              <div class="tab_archives_title">{{prev.title?prev.title:'没有更多'}}</div>
            </div>
            <div class="next_archives" @click="togo(next._id)">
              <div>下一篇</div>
              <div class="tab_archives_title">{{next.title?next.title:'没有更多'}}</div>
            </div>
          </div>
        </div>
        <comment :comments="comments" :articleId="id" @update="update"></comment>
        <!-- <comment></comment> -->
      </el-col>
      <!-- 移动 -->
      <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
        <div class="warp">
          <div class="head_image">
            <!-- :style="{backgroundImage: 'url('+ item.filename +')'}" -->
            <img :src="item.filename" alt />
          </div>
          <div class="info_body">
            <div class="title">{{item.title}}</div>
            <div class="time">{{time}}</div>
            <div class="mavon_editor_warp">
              <mavon-editor
                style="width:330px"
                class="mavon_editor"
                v-model="content"
                default_open="preview"
                defaultOpen="preview"
                :toolbarsFlag="false"
                :subfield="false"
              ></mavon-editor>
            </div>
          </div>
          <div class="tab_archives">
            <div class="prev_archives" @click="togo(prev._id)">
              <div>上一篇</div>
              <div class="tab_archives_title">{{prev.title?prev.title.substring(0,4)+'....':'没有更多'}}</div>
            </div>
            <div class="next_archives" @click="togo(next._id)">
              <div>下一篇</div>
              <div class="tab_archives_title">{{next.title?next.title.substring(0,4)+'....':'没有更多'}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CommonHeader from "@/components/commonHeader";
import comment from "@/components/comment";
import { timestampToTime, checkLastTime } from "@/utils";
import { getStudylogDetail, newComment } from "@/api";
export default {
  name: "studyDetail",
  components: {},
  data() {
    return {
      id: -1,
      item: {},
      content: "",
      // comments: [],
      prev: {},
      next: {},
      comments: [
        {
          id: 0,
          from_uid: 11111,
          from_uname: "非洲刘德华",
          avatar: "avatar",
          to_uid: null,
          content: "啊十分大师傅",
          date: "2018-07-18 20:12",
          open: false,
          child: [
            {
              from_uid: 2222,
              from_uname: "乌鸦坐飞机",
              avatar: "avatar",
              to_uid: 1111,
              to_uname: "非洲刘德华",
              content: "asdf撒旦飞洒发的",
              date: "2018-07-18 20:12",
            },
          ],
        },
        {
          id: 1,
          from_uid: 11111,
          from_uname: "非洲刘德华",
          avatar: "avatar",
          to_uid: null,
          content: "啊十分大师傅",
          date: "2018-07-18 20:12",
          open: false,
          child: [
            {
              from_uid: 2222,
              from_uname: "乌鸦坐飞机",
              avatar: "avatar",
              to_uid: 1111,
              to_uname: "非洲刘德华",
              content: "asdf撒旦飞洒发的",
              date: "2018-07-18 20:12",
            },
            {
              from_uid: 3333,
              from_uname: "飞机",
              avatar: "avatar",
              to_uid: 11111,
              to_uname: "非洲刘德华",
              content: "asdf撒旦飞洒发的",
              date: "2018-07-18 20:12",
            },
            {
              from_uid: 11111,
              from_uname: "非洲刘德华",
              avatar: "avatar",
              to_uid: 2222,
              to_uname: "乌鸦坐飞机",
              content: "asdf撒旦飞洒发的",
              date: "2018-07-18 20:12",
            },
          ],
        },
      ],
    };
  },
  props: {},
  components: {
    CommonHeader,
    comment,
  },
  methods: {
    async getStudylogDetail(id) {
      let res = await getStudylogDetail({ id: id });
      console.log(res);
      this.item = res.data;
      this.id = res.data._id;
      // this.comments = res.data.comments;
      this.content = res.data.content;
      let { prev, next } = res.data;
      this.prev = prev;
      this.next = next;
    },
    togo(id) {
      if (id) {
        this.$router.push({ path: "/studylogDetail", query: { id: id } });
        this.getStudylogDetail(id);
      }
    },
    update: function () {
      this.getStudylogDetail();
    },
  },

  computed: {
    time: function () {
      return timestampToTime(this.item.timestamp);
    },
  },
  created() {
    this.getStudylogDetail(this.$route.query.id);
  },
  mounted() {},
};
</script>

<style scoped>
.info_body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin-top: 1.25rem;
  box-shadow: 0 0 10px rgba(106, 115, 125, 0.6);
}
.mavon_editor {
  width: 100%;
}
.time {
  width: 100%;
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.8rem;
  color: rgb(106, 115, 125);
  /* padding: 0 2.25rem; */
}
.tab_archives_title {
  margin-top: 1.25rem;
  font-size: 0.8125rem;
}
.prev_archives,
.next_archives {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1.25rem;
  /* background: rgb(245, 244, 244); */
}
.next_archives {
  margin-left: -1px;
}
.tab_archives {
  display: flex;
  width: 60%;
  justify-content: space-around;

  padding: 0 1.25rem;
}

.content {
  width: 100%;
}
.title {
  width: 100%;
  text-align: center;
  margin-top: 1.25rem;
  font-size: 2.25rem;
  font-weight: bold;
  /* border-bottom: 3px solid #000 */
}
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 1.875rem; */
}
.head_image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  top: 3rem;
  width: 60%;
  height: 16.25rem;
  border-radius: 15px;
  overflow: hidden;
}
.head_image > img {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .head_image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
    top: 3rem;
    width: 90%;
    height: 10.25rem;
    border-radius: 15px;
    overflow: hidden;
  }
  .info_body {
    width: 90%;
  }
}
</style>
