<template>
  <div class="adminheader">
    <div class="zhanwei">1</div>
    <div class="adminheader_warp">
      <div class="title">LESHAOTAO.BLOG后台管理系统</div>
      <div class="admin_info">
        <div class="admin_avatar">
          <el-avatar :size="25" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </div>
        <div class="admin_info_warp">
          <div class="admin_username">
            <span>您好!</span>爱喝柠檬茶的乐少涛
          </div>
          <div class="admin_permissions">Administrator</div>
        </div>

        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminheader",
  components: {},
  data() {
    return {
      // activeIndex:1
    };
  },
  methods: {
    errorHandler() {
      return true;
    }
  },
  created() {}
};
</script>

<style scoped>
.adminheader {
  height: 7vh;
}
.zhanwei {
  height: 7vh;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 20px;
}
.adminheader_warp {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  background: #000;
  height: 45px;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 9999;
}
.title {
  color: #fff;
}
.admin_info {
  display: flex;
  align-items: center;
  height: 100%;
}
.admin_info_warp {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #fff;
  padding: 5px 0;
  justify-content: space-around;
  box-sizing: border-box;
  margin-left: 10px;
}
.admin_username {
  font-size: 12px;
  font-weight: bold;
}
.admin_permissions {
  font-size: 10px;
  font-style: oblique;
}
</style>
