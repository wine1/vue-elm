<template>
  <div class="shop-cart">
    <div class="add-btn">
      <div class="wrap-reduce" @click="removeOutCart(foods._id,foods.name,foods.specfoods[0].price)">
        <img src="../../images/reduce.png" alt />
      </div>
      <div class="wrap-num">
        <p>{{foodNum}}</p>
      </div>
      <div class="wrap-add" @click="addToCart(foods._id,foods.name,foods.specfoods[0].price)">
        <img src="../../images/add.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {};
  },
  props: ["foods","shopId"],

  //   computed: {},

  //   mounted: {},

    methods: {
      ...mapMutations(ADD_CART,REDUCE_CART),
      addToCart(id,name,price) {

      }
    }
};
</script>
<style lang='scss' scoped>
.add-btn {
  display: flex;

  .wrap-reduce,
  .wrap-add {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #3190e8;
    font-size: 0;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  .wrap-add {
    background: #3190e8;
  }
  .wrap-num {
    line-height: 1rem;
    font-size: 0.8rem;
    padding: 0 0.3rem;
  }
}
</style>