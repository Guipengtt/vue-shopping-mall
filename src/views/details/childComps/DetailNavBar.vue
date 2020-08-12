<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="goBack">
        <img src="@/assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{active: currentIndex == index}"
          @click="btnClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },

    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 4px;
}

.back img {
  width: 18px;
  height: 18px;
}
</style>
