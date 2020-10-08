<template>
  <div class="admin">
    <admin-header></admin-header>
    <admin-layout></admin-layout>
  </div>
</template>

<script>
import AdminHeader from "@/pages/Admin/components/adminheader";
import AdminLayout from "@/pages/Admin/components/adminlayout";
export default {
  name: "admin",
  components: {
    AdminHeader,
    AdminLayout
  },
  data() {
    return {
      tabPosition: "left"
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.admin{
  display: flex;
  flex-direction: column;
}
</style>
