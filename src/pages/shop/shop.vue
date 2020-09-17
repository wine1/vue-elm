<template>
  <div id="shop">
    <header>
      <ul>
        <li>商品</li>
        <li>评价</li>
      </ul>
    </header>
    <div class="wrapper">
      <div class="menu-left" ref="menuLeft">
        <ul>
          <li v-for="item in menus" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
      <div class="menu-right" ref="menuRight">
        <ul>
          <li v-for="item in menus" :key="item.id">
            <p class="name">{{item.name}}</p>
            <ul>
              <li v-for="(foods) in item.foods" :key="foods._id">
                <router-link :to="{path:'shop/foodDetail',query:{}}">
                  <img :src="imgBaseUrl+foods.image_path" alt />
                </router-link>
                <div class="wrap-right">
                  <p>{{foods.name}}</p>
                  <p>{{foods.tips}}</p>
                  <p>{{foods.specfoods.price}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  <!-- <shopCart></shopCart> -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { shopCart } from "../../components/common/shopCart";
import { foodMenu } from "../../service/getData";
import { imgBaseUrl } from "../../../src/config/env";
export default {
  data() {
    return {
      menus: [],
      restaurant_id: "",
      imgBaseUrl,
      countPrice
    };
  },

  components: {shopCart},

  created: function() {
    if (this.$route.query) {
      this.restaurant_id = this.$route.query.id;
    }
  },

  //   computed: {},

  mounted() {
    this.initData();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapMenu, {});
    });
  },

  methods: {
    async initData() {
      let res = await foodMenu(this.restaurant_id);
      this.menus = res;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>