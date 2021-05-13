<template>
  <div class="login-page">
    <div class="login-main">
      <div class="user_avatar">
        <img src="../assets/images/book.png" alt="" srcset="" />
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRule"
        ref="loginFormRef"
        label-width="0px"
        class="demo-loginForm"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            prefix-icon="iconfont icon-iconfonticon-yonghu"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btns">
          <el-button type="primary" @click="submitForm('loginFormRef')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        password: '123456',
        username: 'admin'
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '密码在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    console.log(
      Math.random()
        .toString(36)
        .substr(0, 20)
    )
    // 随机字符串产生函数
    // let str = this.randomString();
    // console.log("srt", str);
  },
  methods: {
    randomString () {
      const len = 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = chars.length
      let character = ''
      for (let i = 0; i < len; i++) {
        character += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return character
    },
    // 登录提交
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 校验通过
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            return this.$message({
              message: res.meta.msg,
              type: 'error'
            })
          }
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  font-size: 15px;
  .login-main {
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
    width: 260px;
    padding: 30px;
    box-shadow: 0px 0px 3px rgb(96, 197, 243);
    .login-btns {
      display: flex;
      justify-content: flex-end;
    }
  }
  .user_avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    border: 4px solid rgb(250, 241, 241);
    position: absolute;
    top: -5%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
    }
  }
}
</style>
