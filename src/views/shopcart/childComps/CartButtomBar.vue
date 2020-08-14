<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button :isCheck="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: {{totalPrice}}</div>
    <div class="calculate">去结算 {{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartButtonBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return !this.cartList.filter((item) => {
          return !item.checked;
        }).length;
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.map((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.map((item) => {
          item.checked = true;
        });
      }
    },
  },
};
</script>

<style scoped>
.buttom-bar {
  position: fixed;
  height: 40px;
  background-color: #eee;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 40px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: yellow;
  text-align: center;
}
</style>
