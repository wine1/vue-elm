<template>
  <div id="shop">
    <loading v-if="isLoading"></loading>
    <div class="wrap-header">
      <div class="nav-back" @click="navBack">
        <img src="../../images/back.png" alt />
      </div>
      <img class="shop-img" :src="`${imgBaseUrl}${this.shopImg}`" alt />
      <div class="wrap-text">
        <div class="shop-name">{{this.shopName}}</div>
        <div class="shop-rating">评分：{{this.shopRating}}</div>
      </div>
    </div>
    <ul class="tab-bar">
      <li :class="{ 'active-bar': changeShowType == 'food' }" @click="changeShowType = 'food'">商品</li>
      <li
        :class="{ 'active-bar': changeShowType == 'rating' }"
        @click="changeShowType = 'rating'"
      >评价</li>
    </ul>
    <ul class="tab-content">
      <li v-show="changeShowType == 'food'" style="height:100%;">
        <div class="wrapper">
          <div class="menu-left" ref="menuLeft" id="menuLeft">
            <ul>
              <li
                v-for="(item, index) in menus"
                :key="item.id"
                :class="{ active: index == menuIndex }"
                @click="chooseMenu(index)"
              >{{ item.name }}{{ item.type }}</li>
            </ul>
          </div>
          <div class="menu-right" ref="menuRight">
            <ul class="menu-right-ul">
              <li v-for="item in menus" :key="item.id">
                <p class="name">{{ item.name }}</p>
                <ul>
                  <li v-for="foods in item.foods" :key="foods._id">
                    <router-link :to="{ path: 'shop/foodDetail', query: {} }">
                      <img :src="imgBaseUrl + foods.image_path" alt />
                    </router-link>
                    <div class="wrap-right">
                      <p>{{ foods.name }}</p>
                      <p>{{ foods.tips }}</p>
                      <p>{{ foods.rating }}</p>
                      <p>￥{{ foods.specfoods[0].price }}</p>
                    </div>
                    <buyCart class="shop-cart" :shopId="shopId" :foods="foods"></buyCart>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- 购物车列表开始 -->
        <div class="wrap-cart-list" v-if="showCartList && shopCart.length">
          <div class="mask" @click="toggleCartList"></div>
          <ul>
            <li v-for="item in shopCart" :key="item.id">
              <p>{{ item.name }}</p>
              <p>{{ item.price }}</p>
            </li>
          </ul>
        </div>

        <!-- 购物车列表结束 -->
        <!-- 底部购物车开始 -->
        <div class="wrap-buy-cart" :class="{ 'wrap-buy-cart-active': shopCart.length }">
          <div class="wrap-icon" @click="toggleCartList">
            <div class="dot" v-if="countFood">{{ countFood }}</div>
            <img src="../../images/buycart.png" alt />
          </div>

          <div class="wrap-price">
            <p>￥{{ countPrice }}</p>
            <p>配送费￥{{ countDelivery }}</p>
          </div>

          <div class="wrap-button">
            <p v-if="{miniOrderAmount}">还差￥{{ miniOrderAmount }}元起送</p>
            <p v-else>去结算</p>
          </div>
        </div>
        <!-- 底部购物车结束 -->
      </li>
      <li v-show="changeShowType == 'rating'">
        <p>评论</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import buyCart from "../../components/common/buyCart";
import loading from "../../components/common/loading";
import { foodMenu } from "../../service/getData";
import { imgBaseUrl } from "../../../src/config/env";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      changeShowType: "food",
      menus: [],
      menuIndex: 0,
      shopId: "",
      shopName: "",
      shopImg: "",
      shopRating: "",
      imgBaseUrl,
      countPrice: "0.00",
      isLoading: true,
      shopListTop: [],
      foodScroll: null, //食品列表scroll
      countDelivery: "0",
      miniOrderAmount: "0",
      // cartList: [], //购物车列表
      showCartList: false, //展示购物车列表
    };
  },

  components: { buyCart, loading },

  created: function () {
    if (this.$route.query) {
      console.log(this.$route.query);
      this.shopId = this.$route.query.id;
      this.shopName = this.$route.query.name;
      this.shopImg = this.$route.query.img;
      this.shopRating = this.$route.query.rating;
      this.countDelivery = this.$route.query.deliveryFee;
      this.miniOrderAmount = this.$route.query.miniOrderAmount;
    }
  },

  computed: {
    ...mapState(["latitude", "longitude", "cartList"]),
    //当前商店购物信息
    shopCart: function () {
      return { ...this.cartList[this.shopId] };
    },

      countFood:function(){
        return this.cartList.length
      }
  },

  mounted() {
    this.initData();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.menuRight, {});
      const bscroll = new BScroll(".menu-left", { click: true });
    });
  },

  watch: {
    isLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight();
        });
      }
    },
  },

  methods: {
    async initData() {
      let res = await foodMenu(this.shopId);
      res.forEach((item, index) => {
        item.cartCount = 0; //设置商品加入购物车的数量
      });
      this.menus = res;
      this.isLoading = false;
    },

    //点击左侧食品列表标题，相应列表移动到最顶层
    chooseMenu(index) {
      this.menuIndex = index;
      this.foodScroll.scrollTo(0, -this.shopListTop[index] + 40, 400);
    },
    getFoodListHeight() {
      const listContainer = this.$refs.menuRight;
      const listArr = Array.from(listContainer.children[0].children);
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop;
      });
      this.listenScroll(listContainer);
    },
    //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
    listenScroll(element) {
      this.foodScroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true,
      });

      this.foodScroll.on("scroll", (pos) => {
        if (!this.$refs.menuLeft) {
          return;
        }
        this.shopListTop.forEach((item, index) => {
          if (Math.abs(pos.y) >= item - 40) {
            this.menuIndex = index;
          }
        });
      });
    },

    //切换购物车的显示隐藏
    toggleCartList() {
      this.showCartList = !this.showCartList;
      console.log(this.shopCart);
    },

    navBack() {
      console.log(this.$router);
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='scss' scoped>
.wrap-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: flex;
  background: #3190e8;
  z-index: 999;
  .nav-back {
    position: absolute;
    left: 0;
    top: 0;
    height: 2rem;
    width: 2rem;
    padding: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shop-img {
    height: 4rem;
    width: 4rem;
    margin: 1rem;
    margin-left: 3rem;
  }

  .wrap-text {
    flex: 1;
    padding-top: 1rem;
    .shop-name {
      color: #fff;
    }
    .shop-rating {
      color: #fff;
    }
  }
}
.tab-bar {
  display: flex;
  position: fixed;
  top: 6rem;
  left: 0;
  width: 100vw;
  border-bottom: 1px solid #eee;
  background: #fff;
  z-index: 1000;
  li {
    flex: 1;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1rem;
  }
  .active-bar {
    position: relative;
    color: #3190e8;
    &:after {
      content: "";
      position: absolute;
      bottom: 1px;
      left: 50%;
      height: 4px;
      width: 30px;
      margin-left: -15px;
      background: #3190e8;
      border-radius: 3px;
    }
  }
}

.tab-content {
  height: 100vh;
  padding: 8rem 0 3rem;
}
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.menu-left {
  height: 100%;
  width: 4rem;
  overflow: scroll;
  li {
    padding: 0.8rem 0.5rem;
    font-size: 0.8rem;
    line-height: 1.1rem;
    border-bottom: 1px solid #eee;
    &.active {
      position: relative;
      background: #fff;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: #3190e8;
      }
    }
  }
}
.menu-right {
  height: 100%;
  width: calc(100% - 4rem);
  // flex: 1;
  .menu-right-ul {
    padding-bottom: 100vh;
  }
  li {
    border-bottom: 1px solid #eee;
    background: #fff;
    .name {
      height: 40px;
      line-height: 40px;
      background: #eee;
    }
    ul {
      li {
        position: relative;
        display: flex;
        padding: 0.5rem;
        box-sizing: border-box;
        img {
          // position: absolute;
          // left: .5rem;
          // top:.5rem;
          height: 3rem;
          width: 3rem;
          margin-right: 0.5rem;
        }
        .wrap-right {
          // flex: 1;
          p {
            word-break: break-all;
          }
        }
        .shop-cart {
          position: absolute;
          right: 0.5rem;
          bottom: 0.5rem;
        }
      }
    }
  }
}

.wrap-cart-list {
  position: fixed;
  bottom: 3rem;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #f2f3fa;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1001;
  }
  ul {
    position: relative;
    background: #f2f3fa;
    z-index: 1002;
  }
}
.wrap-buy-cart {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 3rem;
  z-index: 1010;
  background-color: #3d3d3f;
  color: #fff;
  .wrap-icon {
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    height: 3rem;
    width: 3rem;
    padding: 0.3rem;
    border: 2px solid #fff;
    border-radius: 50%;
    background-color: #3d3d3f;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .dot {
    position: absolute;
    right: -0.2rem;
    top: -0.2rem;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: red;
    text-align: center;
    line-height: 1rem;
    font-size: 0.7rem;
    color: #fff;
  }

  &.wrap-buy-cart-active {
    background: #3190e8;
    .wrap-icon {
      background: #3190e8;
    }
  }

  .wrap-price {
    flex: 1;
    margin-left: 5rem;
    color: #fff;
    font-size: 0.9rem;
    p {
      color: #fff;
    }
  }
  .wrap-button {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    p {
      color: #fff;
    }
  }
}
</style>