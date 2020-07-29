<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swaper :top-images="topImages"></detail-swaper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from "@/views/details/childComps/DetailNavBar";
import DetailSwaper from "@/views/details/childComps/DetailSwaper";
import DetailBaseInfo from "@/views/details/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/details/childComps/DetailShopInfo";

import { getDetails, Goods, Shop } from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwaper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  created() {
    // 得到商品iid
    this.iid = this.$route.params.iid;

    // 请求数据
    getDetails(this.iid).then((res) => {
      const data = res.data.result;
      console.log(res);
      // 1. 获取顶部图片(轮播数据)
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style scoped>
</style>
