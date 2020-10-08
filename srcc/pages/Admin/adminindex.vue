<template>
  <div class="adminindex">
    <div class="adminindex_info">
      <h2>欢迎您来到!</h2>
      <p>LESHAOTAO.BLOG后台管理系统</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "adminindex",
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.adminindex {
  display: flex;
  width: 100%;
  height: 92vh;
  align-items: center;
}
.adminindex_info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 150px;
}
.adminindex_info > h2 {
  font-size: 2.875rem;
  font-weight: bold;
}
.adminindex_info > p {
  font-size: 1.875rem;
  font-weight: bold;
}
</style>