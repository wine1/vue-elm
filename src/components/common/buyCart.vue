<template>
  <div class="shop-cart">
    <div class="add-btn">
      <div
        class="wrap-reduce"
        @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)"
      >
        <img src="../../images/reduce.png" alt />
      </div>
      <div class="wrap-num">
        <p>{{foodNum}}</p>
      </div>
      <div
        class="wrap-add"
        @click="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)"
      >
        <img src="../../images/add.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      foodNum: 0,
    };
  },
  props: ["foods", "shopId"],

  computed: {
    ...mapState(["cartList"]),

    shopCart: function () {
      return Object.assign({}, this.cartList[this.shopId]);
    },
    // foodNum: function(){
    // },
  },

  //   mounted: {},

  methods: {
    ...mapMutations(["ADD_CART", "REDUCE_CART"]),
    //加入购物车，计算按钮位置。
    addToCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock,
      event
    ) {
      this.ADD_CART({
        shopid: this.shopId,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
      });
      this.foodNum += 1;
      // let elLeft = event.target.getBoundingClientRect().left;
      // let elBottom = event.target.getBoundingClientRect().bottom;
      // this.showMoveDot.push(true);
      // this.$emit("showMoveDot", this.showMoveDot, elLeft, elBottom);
    },
    removeOutCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock
    ) {
      if (this.foodNum > 0) {
        this.REDUCE_CART({
          shopid: this.shopId,
          category_id,
          item_id,
          food_id,
          name,
          price,
          specs,
          packing_fee,
          sku_id,
          stock,
        });

      this.foodNum -= 1;
      }
    },
  },
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