<template>
  <div class="comment">
    <div v-if="isSignIn===0" @click="signIn" class="signIn">登录留言吧~~</div>
    <div v-else class="comment_warp">
      <div class="comment_ipt">
        <div class="block">
          <el-avatar :size="45" :src="circleUrl"></el-avatar>
        </div>
        <div class="text_ipt">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="发条友善的评论"
            v-model="submitTxt"
            resize="none"
          ></el-input>
        </div>
        <div>
          <el-button type="primary" @click="submit_new">发表评论</el-button>
        </div>
      </div>
    </div>
    <div v-if="true" class="comments_list">
      <ul class="comments_ul">
        <li class="comments_li" v-for="(item,index) in comments" :key="index">
          <div class="comment_user_logo">
            <el-avatar :size="45" :src="circleUrl"></el-avatar>
          </div>
          <div class="comment_info">
            <div class="info_username">{{item.from_uname}}</div>
            <div
              class="info_comment"
            >{{item.content}}</div>
            <div class="info_time">
              <span>{{item.date}}</span>
              <i @click="setTextarea">回复</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getStudylogDetail, newComment } from "@/api";
import { Guid, getDate } from "#/js/public";
import { getCookie } from "@/utils";
export default {
  name: "comment",
  props: ["comments", "articleId"],

  data() {
    return {
      nickName: null,
      avatar: null,
      username: null,
      token: null,
      submitTxt: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.username = localStorage.getItem("u_n");
    this.token = getCookie("_t");
    console.log(this.comments);
  },
  mounted() {
    console.log(this.comments);
    console.log(this.articleId);
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    textArea() {
      return this.comments.map((e) => {
        return null;
      });
    },
  },
  methods: {
    setTextarea() {
      console.log("回复");
    },
    submit_new() {
      let that = this;
      let obj = {
        _id: that.articleId, //文章id
        id: Guid(), //评论id
        from_uid: that.username,
        from_uname: that.nickName,
        avatar: that.avatar,
        content: that.submitTxt,
        date: getDate(),
      };
      console.log(obj);
    },
    signIn() {
      this.$router.push({ path: "/signin" });
    },
  },
};
</script>

<style scoped>
.info_username {
  color: #fb7299;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
}
.info_comment {
  font-size: 0.875rem;
  padding: 0 0.625rem;
  line-height: 1.25rem;
}
.info_time {
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.625rem;
  color: #99a2aa;
}
.info_time > i {
  color: #409eff;
  margin-left: 0.9375rem;
}
.comment_info {
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
  flex: 1;
}
.comments_li {
  display: flex;
  padding: 1.875rem 0;
}
.comment {
  width: 100%;
}

.comment_warp,
.comments_list {
  width: 60%;
  margin: 0 auto;
}
.comment_ipt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(106, 115, 125, 0.2);
}
.text_ipt {
  width: 70%;
}
.text_ipt > textarea {
  background-color: #f4f5f7;
  padding: 0.625rem;
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
}
</style>
