<template>
  <el-container class="home-container">
    <el-header class="header-content">
      <div class="header-main">
        <img src="../assets/images/book.png" alt="" />
        <div class="header-project-name">电商后台管理系统</div>
      </div>
      <div style="">
        <el-button @click="logout"> 退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside-content">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <swiper></swiper>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 滑动组件
import swiper from '../components/swiper.vue'
export default {
  name: 'Home',
  components: {
    swiper
  },
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout(e) {
      // e.preventDefault()
      console.log(222)
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="scss">
.home-container {
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.header-content {
  background-color: #373c41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aside-content {
  background-color: #323744;
}
.header-main {
  display: flex;
  align-items: center;
  height: 100%;
  img {
    // height: 100%;
    width: 60px;
    margin-right: 10px;
  }
  .header-project-name {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
