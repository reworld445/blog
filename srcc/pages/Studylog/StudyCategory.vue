<template>
  <div class="category">
    <div class="studylog_category">
      <div class="studylog_category_warp">
        <div class="category_title">分类</div>
        <ul class="category_ul">
          <li
            class="category_li"
            v-for="(item,index) in typeArr"
            :key="index"
            @click="getcategory(item)"
          >
            <span class="iconfont icondian"></span>
            <div>{{item.type}} ( {{item.list.length}} )</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { timestampToTime, checkLastTime } from "@/utils";
import { getStudylogtype, getcategory } from "@/api";
export default {
  name: "studylog_category",
  components: {},
  data() {
    return {
      typeArr: [],
    };
  },
  props: {
    updatelist: Array,
  },
  methods: {
    async getStudylogtype() {
      let res = await getStudylogtype();
      this.typeArr = res.data;
    },
    async getcategory(item) {
      let res = await getcategory({
        name: "study",
        type: item.type,
        page: this.page,
      });
      res.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
        item.timestamp = checkLastTime(item.timestamp);
      });
      this.$emit("update", res.data);
    },
  },
  computed: {},
  created() {
    this.getStudylogtype();
  },
  mounted() {},
};
</script>

<style scoped>
.category {
  position: fixed;
  width: 30%;
}
.studylog_category {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
}
.studylog_category_warp {
  display: flex;
  padding: 1.25rem 0.9375rem;
  flex-direction: column;
  /* background: rgba(255, 255, 255, 0.5); */
  border-radius: 0.9375rem;
  background: linear-gradient(145deg, #f9f9fb, #ffffff);
  box-shadow: -8px 8px 10px #bdbdbeab, -21px -21px 70px #ffffff;
}
.category_title {
  font-size: 1.5625rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.9375rem;
}
.category_ul {
  padding: 1.25rem;
  padding-bottom: 0;
}
.category_li {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5px 0;
}
</style>
