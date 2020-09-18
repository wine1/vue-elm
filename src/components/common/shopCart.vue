<template>
  <div class="shop-cart">{{countPrice}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
props:['countPrice'],

//   computed: {},

//   mounted: {},

//   methods: {}
};
</script>
<style lang='scss' scoped>
.shop-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}
</style>