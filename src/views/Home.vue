<template>
  <div class="home">
    <div style="width: 100%;height: 300px;">
      <swiper :options="swiperOptions" ref="mySwiper">
        <!-- slides -->
        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-2.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-3.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-4.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-2.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <swiper-slide
          ><img
            src="https://img.yzcdn.cn/vant/apple-3.jpg"
            alt=""
            class="lunbotu"
        /></swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 1000,
        freeMode: true,
        mousewheel: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      stepActive: 6
    }
  }
}
</script>
<style scoped>
.lunbotu {
  width: 300px;
}
</style>
