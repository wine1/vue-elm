<template>
  <div id="shop_list">
    <div class="shop-list-info" v-for="item in shopLists">
      <img class="image" :src="imgBaseUrl+item.image_path" alt />
      <div class="wrap-info">
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgBaseUrl } from "../../../src/config/env";
export default {
  data() {
    return { imgBaseUrl };
  },
  props: ["shopLists"],
  methods: {}
};
</script>

<style lang='scss' scoped>
.shop-list-info {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  .image {
    height: 4rem;
    width: 4rem;
    margin-right: .5rem;
  }
  .wrap-info {
    .name {
    }
  }
}
</style>