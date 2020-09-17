<template>
  <div id="shop_list">
    <div v-for="item in lists">
      <router-link  class="shop-list-info"  :to="{path:'shop',query:{geohash,id:item.id}} " :key="item.id">
        <img class="image" :src="imgBaseUrl+item.image_path" alt />
        <div class="wrap-info">
          <div class="name">{{item.name}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { imgBaseUrl } from "../../../src/config/env";
export default {
  data() {
    return { imgBaseUrl };
  },
  props: ["lists", "geohash"],
  methods: {}
};
</script>

<style lang='scss' scoped>
.shop-list-info {
  display: flex;
  padding: .5rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  .image {
    height: 4rem;
    width: 4rem;
    margin-right: 0.5rem;
  }
  .wrap-info {
    .name {
      word-break: break-all;
    }
  }
}
</style>