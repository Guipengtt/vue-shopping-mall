<template>
  <div class="mait">
    <div v-for="(item, index) in maitItem" :key="index" class="mait-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Maitkey",
  props: {
    maitItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.mait {
  vertical-align: middle;
  overflow: hidden;
}
.mait-item {
  float: left;
  margin-top: 10px;
}
.mait-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.item-title {
  font-size: 11px;
  text-align: center;
}
</style>
