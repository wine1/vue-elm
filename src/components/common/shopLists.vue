<template>
  <div id="shop_list">
    <div v-for="item in lists">
      <router-link
        class="shop-list-info"
        :to="{path:'shop',query:{geohash,id:item.id,deliveryFee:item.float_delivery_fee,miniOrderAmount:item.float_minimum_order_amount,name:item.name,img:item.image_path,rating:item.rating}} "
        :key="item.id"
      >
        <img class="image" :src="imgBaseUrl+item.image_path" alt />
        <div class="wrap-info">
          <div class="name">{{item.name}}</div>
          <div class="address">{{item.address}}</div>
          <div class="rating">{{item.rating}}</div>
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
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  .image {
    height: 4rem;
    width: 4rem;
    margin-right: 0.5rem;
  }
  .wrap-info {
    flex: 1;
    .name {
      word-break: break-all;
    }
  }
}
</style>