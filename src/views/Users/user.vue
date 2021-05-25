<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="padding-bottom:20px;margin-top:20px;">
      <!-- 用户搜索和添加用户 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable 
            @clear="clearQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button></el-col
        >
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#66b1ff"
              inactive-color="#ff4949"
              @change="userStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRow(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip content="设置" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <el-pagination
      class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      >
      </el-pagination>
    </el-card>
    <el-card v-show="false">
       <div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        ref="addUser"
      >
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formLabelAlign.rid"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('addUser')">提交</el-button>
    </div>
    </el-card>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      value: true,
      userList: [
        //用户列表
        {
          id: 25,
          username: '小王',
          email: '1234562qq.com',
          mobile: 13627836884,
          role_name: '管理员',
          mg_state: true
        },
        {
           id: 10,
          username: '小王',
          email: '1234562qq.com',
          mobile: 13627836884,
          role_name: '管理员',
          mg_state: false
        },
        {
           id: 15,
          username: '小王',
          email: '1234562qq.com',
          mobile: 13627836884,
          role_name: '管理员',
          mg_state: false
        },
        {
           id: 1,
          username: '小王',
          email: '1234562qq.com',
          mobile: 13627836884,
          role_name: '管理员',
          mg_state: true
        }
      ],
      queryInfo: {
        query: '',
        pagesize: 1,
        pagenum: 2,
      },
      labelPosition:'left',
      formLabelAlign: { //添加用户
          username: '',
          password: '',
          rid: ''
        }
    }
  },
  created() {
    this.getUserList()
   
  },
  methods: {
    // 获取用户列表（接口有问题）
    async getUserList() {
      let data = await this.$http.get('users', this.queryInfo)
      // this.userList = data.data
      // console.log(data, '用户列表')
    },
    // 搜索用户信息
    searchUser() {
      this.getUserList()
    },
    clearQuery() {
      console.log(this.queryInfo.query,"清空")
      this.getUserList()
    },
    // 编辑用户信息
    editRow(row) {
      console.log('编辑')
    },
    // pageSize 每页个数
    handleSizeChange(value) {
      // console.log('个数', value)
      this.queryInfo.pagesize = value
      this.getUserList()
    },
    // 当前页改变
    handleCurrentChange(value) {
      // console.log('当前页', value)
      this.queryInfo.pagesize = value
      this.getUserList()
    },
    async userStatusChange(userinfo) {
      // 修改用户状态
      console.log('row',userinfo)
      this.$message.success('更新用户状态成功啦');
      // 用户接口有问题
      // const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      // console.log(res,"修改用户状态")
      //  if(!res.status){
      //     return this.$message.success('更新用户状态成功啦');
      //   } else{
      //      userinfo.mg_state = !userinfo.mg_state
      //      return this.$message.error('更新失败');
      //   }
    },
    // 添加用户
    submitForm (from) {
      console.log(this.formLabelAlign)
      this.$http.post('users',this.formLabelAlign).then(res =>{
        console.log(res,'添加用户')
      })
    }
  }
}
</script>

<style>
.pagination {
  margin-top: 20px;
}
</style>
