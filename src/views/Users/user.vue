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
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogAddForm = true"
            >添加用户</el-button
          ></el-col
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
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogAddForm"
      @close="dialogAddFormClose"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="addForm"
        ref="addUserForm"
        :rules="addFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="rid">
          <el-input v-model="addForm.rid"></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-button type="primary" @click="submitForm('addUser')"
          >提交</el-button> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormClose">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义校验规则
    var checkEmail = (rule, value, callback)=>{
      const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
       if (reEmail.test(value)) {
        //  合法邮箱
          return callback();
        }
        return callback('请输入合法的邮箱')
    }
    var checckMobile = (rule,value,callback) =>{
       const reMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
       if (reMobile.test(value)) {
        //  合法手机号
          return callback();
        }
        return callback('请输入合法的手机号')
    }
    return {
      inputValue: '',
      value: true,
      dialogAddForm: false, //添加用户dialog
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
        pagenum: 2
      },
      labelPosition: 'left',
      addForm: {
        //添加用户
        username: '',
        password: '',
        rid: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        // 添加用户form 规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // validator 自定义校验规则
        mobile: [ { required: true, message: '请输入密码', trigger: 'blur' },{ validator: checckMobile, trigger: 'blur' }],
        email: [ { required: true, message: '请输入密码', trigger: 'blur' },{ validator: checkEmail, trigger: 'blur' }]
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
      console.log(data, '用户列表')
    },
    // 搜索用户信息
    searchUser() {
      this.getUserList()
    },
    clearQuery() {
      console.log(this.queryInfo.query, '清空')
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
    // 修改用户状态
    async userStatusChange(userinfo) {
      console.log('row', userinfo)
      this.$message.success('更新用户状态成功啦')
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
    submitForm() {
      this.$refs['addUserForm'].validate(async vaid => {
        console.log(vaid, 'vaid')
        if (vaid) {
          let res = await this.$http.post('users', this.addForm)
          if (!res.status) {
            this.$message.success('添加用户成功')
            this.dialogAddForm = false
          } else {
            this.$message.error('添加用户失败,' + res.error.msg)
          }
          console.log(res)
        }
      })
      return
      this.$http.post('users', this.addForm).then(res => {
        console.log(res, '添加用户')
      })
    },
    // 关闭添加
    dialogAddFormClose() {
      this.dialogAddForm = false
      this.$refs['addUserForm'].resetFields()
    }
  }
}
</script>

<style>
.pagination {
  margin-top: 20px;
}
</style>
