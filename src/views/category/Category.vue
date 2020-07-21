<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
      <li>haha</li>
    </ul>
  </div>
</template>

<script>
import BScoll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScoll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true
    });

    this.scroll.on("scroll", position => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载");
    });
  },

  methods: {
    btnClick() {
      console.log("btnCLick");
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>
