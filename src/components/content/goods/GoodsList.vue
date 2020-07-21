<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in good"
      :key="index"
      class="goods-list-item"
      :goods-item="item"
      :goods-index="index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    good: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
