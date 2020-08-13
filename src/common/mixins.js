import {
  debouncs
} from "./utils"

import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  mounted() {
    const refresh = debouncs(this.$refs.scroll.refresh, 200);
    this.itemListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemListener);
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBack: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
}
