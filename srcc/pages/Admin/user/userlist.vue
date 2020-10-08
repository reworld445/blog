<template>
  <div class="userlist">
    <div class="user_table">
      <el-table
        :data="userData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id:">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="用户名:">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="密码:">
                <span>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="昵称:">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="头像:">
                <span>{{ props.row.avatar }}</span>
              </el-form-item>
              <el-form-item label="管理员:">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="token:">
                <span>{{ props.row.token }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="_id" label="id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="type" label="权限"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除吗？"
              @onConfirm="handDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_paging">
        <!-- @size-change="handleSizeChange" -->
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <transition name="el-fade-in">
      <user-edit
        v-if="isedit"
        :isedit="isedit"
        v-on:close="closeEdit"
        :id="_id"
        v-on:update="updateUserInfo"
        :index="_index"
      ></user-edit>
    </transition>
  </div>
</template>
<script>
import UserEdit from "@/pages/Admin/user/userEdit";
import { getUserList, deleteUser } from "@/api";
export default {
  name: "userlist",
  components: {
    UserEdit,
  },
  data() {
    return {
      userData: [],
      search: "",
      isedit: false,
      _id: "",
      _index: "",
      total: -1,
    };
  },
  methods: {
    updateUserInfo(item, index) {
      // console.log(item);
      this.userData[index]._id = item.id;
      this.userData[index].password = item.password;
      this.userData[index].nickName = item.nickName;
      this.userData[index].type = item.type;
    },
    closeEdit(data) {
      this.isedit = data;
    },
    onConfirm() {
      // console.log("我确定了");
    },
    async getUserList(page) {
      const res = await getUserList({ page: page });
      console.log(res);
      this.userData = res.data.data;
      this.total = res.data.totle;
    },
    handleEdit(index, row) {
      this.isedit = true;
      let id = row._id;
      this._id = id;
      this._index = index;
    },
    async handDelete(index, row) {
      let id = row._id;
      const res = await deleteUser({
        id: id,
      });
      // console.log(res);
      if (res.data.status == 1) {
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success",
          center: true,
        });
        this.userData.splice(index, 1);
      }
    },
    handleCurrentChange(page) {
      this.getUserList(page - 1);
    },
  },
  created() {
    this.getUserList(0);
  },
  mounted() {},
};
</script>

<style scoped>
.page_paging {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  align-items: center;
}
.user_edit {
  position: relative;
  width: 100vh;
  height: 100vh;
}
.page_paging {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  align-items: center;
}

.userlist {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
}
.user_table {
  width: 100%;
}
</style>
