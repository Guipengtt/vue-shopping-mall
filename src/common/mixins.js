import {
  debouncs
} from "./utils"

export const itemListenerMixin = {
  mounted() {
    const refresh = debouncs(this.$refs.scroll.refresh, 200);
    this.itemListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemListener);
  },
}
