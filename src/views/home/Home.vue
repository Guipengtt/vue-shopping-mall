<template>
  <div id="Home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-v-iew></feature-v-iew>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list v-if="typeSelect == 0" :good="goods.pop.list"></goods-list>
      <goods-list v-else-if="typeSelect == 1" :good="goods.new.list"></goods-list>
      <goods-list v-else :good="goods.sell.list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureVIew from "@/views/home/FeatureVIew";

import { getHomeMultiData, getHomeGoods } from "@/network/home";

import { debouncs } from "@/common/utils";
import { itemListenerMixin, backTopMixin } from "@/common/mixins";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureVIew,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          type: "pop",
          page: 0,
          list: [],
        },
        new: {
          type: "new",
          page: 0,
          list: [],
        },
        sell: {
          type: "sell",
          page: 0,
          list: [],
        },
      },
      typeSelect: 0,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
      itemListener: null,
    };
  },
  created() {
    this.getHomeMultiData();

    // 请求商品数据
    this.getHomeGoods(this.goods.pop);
    this.getHomeGoods(this.goods.new);
    this.getHomeGoods(this.goods.sell);
  },

  mounted() {
    // 获取tabControl Offset
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  methods: {
    /*
      事件监听相关方法
    */
    tabClick(index) {
      if (index == 0) {
        this.typeSelect = 0;
      } else if (index == 1) {
        this.typeSelect = 1;
      } else {
        this.typeSelect = 2;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    contentScroll(position) {
      // 1. 判断Backtop是否显示
      this.showBack = -position.y > 1000;

      // 2. 决定tabcontrol是否吸顶
      this.isFixed = -position.y > this.tabOffsetTop;
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /*
    网络请求相关方法
    */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;

        for (let item in this.banners) {
          let str = this.banners[item].image.replace("s10", "s11");
          this.banners[item].image = str;
        }
        for (let item in this.recommends) {
          let str = this.recommends[item].image.replace("s10", "s11");
          this.recommends[item].image = str;
        }
      });
    },
    getHomeGoods(type) {
      const page = type.page + 1;
      getHomeGoods(type.type, page).then((res) => {
        type.list.push(...res.data.data.list);
        type.page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    loadMore() {
      switch (this.typeSelect) {
        case 0:
          this.getHomeGoods(this.goods.pop);
          break;
        case 1:
          this.getHomeGoods(this.goods.new);
          break;
        case 2:
          this.getHomeGoods(this.goods.sell);
          break;
      }
    },
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 50);
    this.$refs.scroll.refresh();
  },

  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 取消全值事件的监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
