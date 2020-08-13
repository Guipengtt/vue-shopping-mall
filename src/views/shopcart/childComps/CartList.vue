<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "@/views/shopcart/childComps/CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    CartListItem,
  },
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
</style>
