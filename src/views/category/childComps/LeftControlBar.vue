<template>
  <div class="left-bar">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="bar-item"
      @click="titleClick(index)"
      :class="{active: currentIndex == index}"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  name: "LeftControlBar",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", this.currentIndex);
    },
  },
};
</script>

<style scoped>
.left-bar {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: black;
  padding-top: 15px;
  border: 1px;
}

.active {
  background-color: white;
  font-weight: 700;
  color: var(--color-tint);
}
</style>
