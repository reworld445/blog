<template>
  <div class="studylist">
    <el-table
      :data="listData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id:">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="标题:">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="简介:">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
            <el-form-item label="封面:">
              <span>{{ props.row.filename }}</span>
            </el-form-item>
            <el-form-item label="分类:">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="日期:">
              <span>{{ props.row.timestamp }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="简介" prop="introduction"></el-table-column>
      <el-table-column label="日期" prop="timestamp"></el-table-column>
      <el-table-column label="操作">
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
    <transition name="el-fade-in">
      <study-edit
        v-if="isedit"
        :isedit="isedit"
        v-on:close="closeEdit"
        :id="_id"
        v-on:update="updateStudyInfo"
        :index="_index"
      ></study-edit>
    </transition>
  </div>
</template>
<script>
import StudyEdit from "@/pages/Admin/studylog/studyEdit";
import { timestampToTime, checkLastTime } from "@/utils";
import { getStudylogList, delStudylog } from "@/api";
export default {
  name: "studylist",
  components: {
    StudyEdit,
  },
  data() {
    return {
      listData: [],
      isedit: false,
      total: -1,
      search: "",
      _id: "",
      _index: "",
    };
  },
  methods: {
    updateStudyInfo(item, index) {
      console.log(item, index);
      this.listData[index].title = item.title;
      this.listData[index].category = item.category;
      this.listData[index].introduction = item.introduction;
      this.listData[index].content = item.content;
      this.listData[index].filename = item.filename;
    },
    closeEdit(data) {
      this.isedit = data;
    },
    async getStudylogList(page) {
      const res = await getStudylogList({ type: "admin", page: page });
      res.data.data.forEach((item, index) => {
        item.timestamp = timestampToTime(item.timestamp);
        if (item.introduction.length > 10) {
          item.introduction = item.introduction.substring(0, 10) + "...";
        }
      });
      this.listData = res.data.data;
      // console.log(res);
      this.total = res.data.totle;
    },
    handleEdit(index, row) {
      this.isedit = true;
      let id = row._id;
      this._id = id;
      this._index = index;
    },
    async handDelete(index, item) {
      const res = await delStudylog({ id: item._id });
      if (res.data.status == 1) {
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success",
          center: true,
        });
        this.listData.splice(index, 1);
      }
    },
    handleCurrentChange(page) {
      this.getStudylogList(page - 1);
    },
  },
  created() {
    this.getStudylogList(0);
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
.studylist {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
