import { ADD_COUNTER, ADD_TO_CART } from "@/store/mutations-type";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1");
      } else {
        context.commit(ADD_TO_CART, payload);
        resolve("成功将商品加入购物车");
      }
    });
  }
};
