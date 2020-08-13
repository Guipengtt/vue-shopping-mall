<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <scroll class="content">
      <cart-list class="cart-list"></cart-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import CartList from "@/views/shopcart/childComps/CartList";
import Scroll from "@/components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "ShopCart",
  components: {
    NavBar,
    CartList,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped >
#cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
  position: relative;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
