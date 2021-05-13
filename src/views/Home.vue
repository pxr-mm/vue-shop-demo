<template>
  <div class="home">
    <div>
    <swiper></swiper>
    </div>
    <div style="margin-top:100px;" >
     <el-button  @click="logout"> 退出</el-button>
    </div>
  </div>
</template>

<script>
// 滑动组件
import swiper from '../components/swiper.vue'
// import swiper from "../components/swiper.vue"
export default {
  name: 'Home',
  components: {
    swiper
  },
  data () {
    return {

    }
  },
  methods: {
    logout (e) {
      // e.preventDefault()
      console.log(222)
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>
