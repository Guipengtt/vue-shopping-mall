<template>
  <div class="detail-swiper">
    <swiper class="d-swiper">
      <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" :alt="index" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "DetailSwaper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.d-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
