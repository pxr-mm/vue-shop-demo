<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <el-row>
        <el-col style="display:flex">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 角色列表 -->
    <el-table :data="roleList" stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="(item, index) in scope.row.children"
            :key="index"
            :class="['bottom-border', index === 0 ? 'bdtop' : '', 'vcenter']"
          >
            <!-- 一级权限 -->
            <el-col :span="5">
              <el-tag closable @close="renoveRightById(scope.row, item.id)">{{
                item.authName
              }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 二级权限 -->
            <el-col :span="19">
              <el-row
                v-for="(second, index2) in item.children"
                :key="index2"
                :class="[index2 == 0 ? '' : 'bdtop', 'vcenter']"
              >
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="renoveRightById(scope.row, second.id)"
                    >{{ second.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 三级标签 -->
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    @close="renoveRightById(scope.row, third.id)"
                    closable
                    v-for="(third, index3) in second.children"
                    :key="index3"
                    >{{ third.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="showSetRoleDialog(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 权限分配 -->
    <el-dialog :title="setTitle+'-权限分配'" :visible.sync="dialogSetRightVisible">
      <el-tree
        :data="rightList"
        :props="treesProps"
        node-key="id"
        show-checkbox
         default-expand-all
         :default-checked-keys="defaultCheckedKeys"
      >
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [], //角色列表
      dialogSetRightVisible: false,
      setTitle:'',
      rightList: [], //权限列表
      treesProps: { //权限树节点的属性
        label: 'authName',
        children: 'children',
      },
      defaultCheckedKeys: [],//默认呗选中的节点--key
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      let res = await this.$http.get('roles')
      if (res.code == 200) {
        this.roleList = res.data
      }
    },
    //  删除角色指定权限
    async renoveRightById(role, rightId) {
      let confirmResult = await this.$confirm(
        '此操作将永久删除该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      if (confirmResult === 'confirm') {
        let result = await this.$http.delete(
          `roles/${role.id}/rights/${rightId}`
        )
        console.log(result)
        if (result.code !== 200)
          return this.$message({
            type: 'info',
            message: '删除失败，请稍后再试'
          })
        role.children = result.data //刷新列表
        this.$message({
          type: 'success',
          message: '已删除'
        })
      }
    },
    // 打开设置权限-获取所有权限列表
    async showSetRoleDialog(row) {
      this.setTitle = row.roleName
      this.defaultCheckedKeys = []
      this.dialogSetRightVisible = true
      let rightTree = await this.$http.get('rights/tree')
      
      if (rightTree.code !== 200) {
        this.$message.error('获取权限失败，请稍后再试')
      } else {
        this.rightList = rightTree.data
      }
      console.log('权限列表', row)
      
      // this.getLeafKeys(row,this.defaultCheckedKeys)
    },
    // 通过递归的形式，获取角色下所有的三级权限id ,并保存到defaultCheckedKeys默认已选中的key中(选中已分配的权限)
    getLeafKeys(row,arr) {
      if(!row.children) {
        return arr.push(row.id)
      }
      row.children.forEach(item => {
        this.getLeafKeys(item,arr)
      });
    }
  }
}
</script>

<style>
.card {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #ccc;
}
.bottom-border {
  border-bottom: 1px solid #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
