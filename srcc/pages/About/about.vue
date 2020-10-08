<template>
  <div class="about">
    <!-- <el-row>
    <el-col :span="24">-->
    <div class="about_warp">
      <div class="about_head">
        <div class="head_tou">
          <img src="@/assets/images/rocky.jpg" alt />
        </div>
        <h1>
          <span>HELLO I’M</span>
        </h1>
        <h2>WEB.PROGRAMMER.乐少涛</h2>
      </div>
      <div class="about_main">
        <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
          <div class="main_left">
            <ul class="about_ul">
              <li class="about_li">
                <h3>About Me</h3>
                <div>
                  <div class="my_info">
                    <div class="my_info_title">基本信息:</div>
                    <ul class="my_info_ul">
                      <li>男</li>
                      <li>95后</li>
                      <li>东莞</li>
                      <li>本科/网络工程</li>
                      <li>web前端开发</li>
                    </ul>
                  </div>

                  <div class="my_info">
                    <div class="my_info_title"></div>
                    <div class="introduction">
                      <p>东莞长大,广州读的大学,大学毕业后,很迷茫!最终回到了东莞选择了做web前端开发,生活日渐消瘦!</p>
                      <p>平常空间时间喜欢研究研究股票,打打游戏,逛逛B站,键盘车神!</p>
                      <p>喜欢自驾游,但是之前工作比较忙,一直没机会游玩祖国的大好河山!</p>
                      <p>未来的梦想当然希望实现财富自由,哈哈哈哈...!争取不做个后浪,做个海啸!</p>
                      <p>先定个小目标,从赚他1个亿开始,芜湖!</p>
                      <p>(最近受疫情影响,原公司经营不下去,失业在家,才有时间写了这个博客)</p>
                    </div>
                  </div>

                  <el-row>
                    <ul class="skills">
                      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                        <li>
                          <el-progress type="circle" :percentage="10" :color="colors" :width="100"></el-progress>
                          <div>html+css</div>
                        </li>
                      </el-col>

                      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                        <li>
                          <el-progress type="circle" :percentage="60" :color="colors" :width="100"></el-progress>
                          <div>JavaScript</div>
                        </li>
                      </el-col>

                      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                        <li>
                          <el-progress type="circle" :percentage="50" :color="colors" :width="100"></el-progress>
                          <div>Node.Js+MongoDB</div>
                        </li>
                      </el-col>

                      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                        <li>
                          <el-progress type="circle" :percentage="70" :color="colors" :width="100"></el-progress>
                          <div>Vue</div>
                        </li>
                      </el-col>
                    </ul>
                  </el-row>
                </div>
              </li>
              <li class="about_li">
                <h3>About Blog</h3>
                <div class="my_info">
                  <div class="my_info_title">建站初衷:</div>
                  <div class="my_info_warp">写博客是为了记录一下平常的生活日记和学习笔记,还有对每日实盘操作的记录和后市的分析</div>
                </div>
                <div class="my_info" style="align-items:unset">
                  <div class="my_info_title">站点结构:</div>
                  <div>
                    <div class="my_info_warp mar_bot">前端--VUE</div>
                    <div class="my_info_warp mar_bot">后端--Node.JS/MongoDB</div>
                    <div class="my_info_warp mar_bot">服务器部署--百度智能云+linux+nginx</div>
                  </div>
                </div>
                <div class="my_info">
                  <div class="my_info_title">建站时间:</div>
                  <div class="my_info_warp">2020年7月31</div>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
          <div class="time_axis">
            <div class="time_title">Time axis</div>
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </div>
    </div>
    <!-- </el-col>
    </el-row>-->
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#6f7ad3", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#5cb87a", percentage: 100 },
      ],
    };
  },
  methods: {
    message() {
      this.$notify({
        title: "成功",
        message: "欢迎进入关于我页面",
        type: "success",
        center: true,
        duration: 1500,
        offset: 100
      });
    },
  },
  created() {
    this.message();
  },
};
</script>

<style scoped>
.my_info_warp {
  font-size: 0.75rem;
  color: rgb(115, 138, 148);
  margin-left: 5px;
}
.mar_bot {
  margin-bottom: 10px;
}
.introduction {
  width: 100%;
  padding: 20px 40px;
  background: rgba(50, 78, 78, 0.2);
  border-radius: 15px;
}
.introduction > p {
  font-size: 14px;
  margin: 10px;
  color: rgba(0, 0, 0, 0.6);
}
.my_info_title {
  font-weight: bold;
  font-size: 14px;
  margin-left: 20px;
  color: rgb(115, 138, 148);
}
.my_info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.my_info_ul {
  display: flex;
}
.my_info_ul > li {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin-left: 0.625rem;
  padding: 0.1875rem 0.625rem;
  background: rgba(90, 78, 78, 0.2);
}

.about_ul {
  width: 100%;
}
.about_li {
  margin-bottom: 1.25rem;
}
.about_li > h3 {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  border-left: 3px solid #6bc30d;
  padding-left: 20px;
}
.time_title {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  border-left: 3px solid #6bc30d;
  padding-left: 20px;
}
.skills {
  /* display: flex;
  justify-content: space-around; */
  width: 100%;
}
.skills li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.skills li > div {
  font-size: 0.875rem;
  padding: 0.625rem;
}
.main_left {
  display: flex;
  padding: 1.875rem;
  box-sizing: border-box;
  justify-content: center;
  overflow: hidden;
}
.time_axis {
  padding: 1.875rem 1.875rem 0 1.875rem;
}
.about_warp {
  margin-top: 2.75rem;
  padding-top: 0.3125rem;
}
.head_tou {
  position: absolute;
  right: 3.125rem;
  top: 1.875rem;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  /* background: #fff; */
  overflow: hidden;
  z-index: 1;
  transition: All 0.4s ease-in-out;
  -webkit-transition: All 0.4s ease-in-out;
  -moz-transition: All 0.4s ease-in-out;
  -o-transition: All 0.4s ease-in-out;
}
.head_tou:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
.head_tou > img {
  width: 100%;
}
.about {
  background: #fafafa;
}
.about_head {
  position: relative;
  padding: 2.8125rem;
  background: #333;
  color: #fff;
  border-radius: 0.9375rem;
  margin: 1.25rem;
}
.about_head > h1 {
  position: relative;
  display: flex;
  font-size: 1.5625rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
}
.about_head > h1 > span::after {
  content: "";
  height: 3px;
  width: 100%;
  background: #51cbce;
  left: 0;
  bottom: -3px;
  position: absolute;
  z-index: 2;
}
.about_head > h2 {
  line-height: 1.25rem;
}
</style>
