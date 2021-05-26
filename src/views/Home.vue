<template>
  <el-container class="home-container">
    <el-header class="header-content">
      <div class="header-main">
        <!-- 折叠菜单栏 -->
        <div
          class="toggle-button"
          :class="collapse ? 'toggle-button-active' : 'toggle-button-active2'"
          @click="changeMenuCollapse"
        >
          |||
        </div>
        <img src="../assets/images/book.png" alt="" />
        <div class="header-project-name">电商后台管理系统</div>
      </div>
      <div style="">
        <el-button @click="logout"> 退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="!collapse ? '200px' : '64px'" class="aside-content">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="collapse"
          :collapse-transition="false"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menusList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveActivePath('/'+subItem.path)"
            >
              <i class="el-icon-menu"></i>
              {{ subItem.authName }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="iconfont icon-iconfonticon-shebei"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-right">
        <!-- 路由占位符 -->
        <router-view></router-view>
        
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      menusList: [],
      collapse: false,
      iconList: { //左侧导航栏对应的字体图标
        '125': 'iconfont icon-iconfonticon-shebei',
        '103': 'iconfont icon-iconfonticon-shebei1',
        '101': 'iconfont icon-iconfont_pifu',
        '102': 'iconfont icon-iconfonticon-yonghu1',
        '125': 'iconfont icon-iconfonticon-zichan',
        '145': 'iconfont icon-iconfonticon3'
      },
      activePath:'',//激活的导航栏
    }
  },
  created() {
    this.getMenus()
    this.activePath = sessionStorage.getItem('activePath')
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout(e) {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus() {
      let res = await this.$http.get('menus')
      // console.log(res,"菜单")

      if (!res.status) {
        this.menusList = res.data
      }
    },
    // 左侧菜单栏折叠
    changeMenuCollapse() {
      this.collapse = !this.collapse
    },
    // 保存菜单栏激活状态
    saveActivePath(activePath){
      sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
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
  .toggle-button {
    font-size: 36px;
    color: #fff;
    margin-right: 10px;
    // animation: all spin linear;
    cursor: pointer;
    transform: rotate(-90deg);
  }

  .toggle-button-active {
    transform: rotate(0deg);
  }
  .toggle-button-active2 {
    transform: rotate(-90deg);
  }
  // 左侧菜单折叠按钮动画
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.iconfont {
  margin-right: 5px;
}
.el-menu {
  border-right: none;
}
.main-right {
  background-color: #eaedf2;
}
</style>
