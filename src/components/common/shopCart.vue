<template>
  <div class="shop-cart">
    <div class="add-btn">
      <div
        class="wrap-reduce"
        @click="removeOutCart(shopId,foods._id,foods.name,foods.specfoods[0].price)"
      >
        <img src="../../images/reduce.png" alt />
      </div>
      <div class="wrap-num">
        <p>{{foodNum}}</p>
      </div>
      <div
        class="wrap-add"
        @click="addToCart(shopId,foods._id,foods.name,foods.specfoods[0].price)"
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
    return {};
  },
  props: ["foods", "shopId"],

  computed: {
    ...mapState(["cartList"]),

    shopCart: function () {
      return Object.assign({}, this.cartList[this.shopId]);
    },
    foodNum: {
      // console.log('foods',this.foods)
      get: function () {
        let num = 0;
        let category_id = this.foods.category_id;
        let item_id = this.foods.item_id;
        if (
          this.shopCart &&
          this.shopCart[category_id] &&
          this.shopCart[category_id][item_id]
        ) {
          let num = 0;
          Object.values(this.shopCart[category_id][item_id]).forEach(
            (item, index) => {
              num += item.num;
            }
          );
        }
        return num
      },
      set: function (newVal) {
        console.log(123,newVal)
        this.foodNum = newVal;
      },
    },
  },

  //   mounted: {},

  methods: {
    ...mapMutations(["ADD_CART", "REDUCE_CART"]),
    addToCart(shopId, foodid, name, price) {
      console.log("addToCart");
      this.ADD_CART({ shopId, foodid, name, price });
      this.foodNum += 1;
    },
    removeOutCart(shopId, foodid, name, price) {
      console.log("removeOutCart");
      if (this.foodNum >= 1) {
        this.REDUCE_CART({ shopId, foodid, name, price });
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