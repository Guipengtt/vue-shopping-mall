<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swaper :top-images="topImages"></detail-swaper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="goodsParam"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :good="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/details/childComps/DetailNavBar";
import DetailSwaper from "@/views/details/childComps/DetailSwaper";
import DetailBaseInfo from "@/views/details/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/details/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/details/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/details/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/details/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/details/childComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";

import Scroll from "@/components/common/scroll/Scroll";
import { debouncs } from "@/common/utils";
import { itemListenerMixin } from "@/common/mixins";

import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      itemListener: null,
      themeTops: [],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwaper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    // 得到商品iid
    this.iid = this.$route.params.iid;

    // 请求数据
    getDetails(this.iid).then((res) => {
      const data = res.data.result;
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

      // 4. 商品详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取参数信息
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.getThemeTopYs = debouncs(() => {
        this.themeTops = [];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.params.$el.offsetTop);
        this.themeTops.push(this.$refs.comment.$el.offsetTop);
        this.themeTops.push(this.$refs.recommends.$el.offsetTop);
        this.themeTops.push(Number.MAX_VALUE);
      }, 500);
    });

    // 获取推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTops[index] - 44), 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
  },
  mixins: [itemListenerMixin],
  mounted() {},

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
