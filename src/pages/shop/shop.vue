<template>
  <div id="shop">
    <loading v-if="isLoading"></loading>
    <ul class="tab-bar">
      <li :class="{'active-bar':changeShowType=='food'}" @click="changeShowType='food'">商品</li>
      <li :class="{'active-bar':changeShowType=='rating'}" @click="changeShowType='rating'">评价</li>
    </ul>
    <ul class="tab-content">
      <li v-show="changeShowType=='food'">
        <div class="wrapper">
          <ul class="menu-left" ref="menuLeft">
            <li
              v-for="(item,index) in menus"
              :key="item.id"
              :class="{'active': index == menuIndex}"
              @click="chooseMenu(index)"
            >{{item.name}}{{item.type}}</li>
          </ul>
          <ul class="menu-right" ref="menuRight">
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
                    <p>￥{{foods.specfoods[0].price}}</p>
                  </div>

                  <div class="add-btn"></div>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <shopCart :countPrice="countPrice"></shopCart>
      </li>
      <li v-show="changeShowType=='rating'">
        <p>评论</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopCart from "../../components/common/shopCart";
import loading from "../../components/common/loading";
import { foodMenu } from "../../service/getData";
import { imgBaseUrl } from "../../../src/config/env";
export default {
  data() {
    return {
      changeShowType: "food",
      menus: [],
      menuIndex: 0,
      restaurant_id: "",
      imgBaseUrl,
      countPrice: 111,
      isLoading: true,
      shopListTop: [],
      foodScroll: null //食品列表scroll
    };
  },

  components: { shopCart, loading },

  created: function() {
    if (this.$route.query) {
      this.restaurant_id = this.$route.query.id;
    }
  },

  //   computed: {},

  mounted() {
    this.initData();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.menuRight, {});
    });

    const bscroll = new BScroll(".menu-left", { click: true });
  },

  watch: {
    isLoading: function(value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight();
        });
      }
    }
  },

  methods: {
    async initData() {
      let res = await foodMenu(this.restaurant_id);
      this.menus = res;
      this.isLoading = false;
      console.log("menus", res);
    },

    //点击左侧食品列表标题，相应列表移动到最顶层
    chooseMenu(index) {
      this.menuIndex = index;
      //menuIndexChange解决运动时listenScroll依然监听的bug
      this.menuIndexChange = false;
      this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
      //   this.foodScroll.on("scrollEnd", () => {
      //     this.menuIndexChange = true;
      //   });
    },
    getFoodListHeight() {
      const listContainer = this.$refs.menuRight;
      const listArr = Array.from(listContainer.children[0].children);
      listArr.forEach(() => {
        this.shopListTop[index] = item.offsetTop;
      });
      this.listenScroll(listContainer);
    },

    listenScroll(element) {
      this.foodScroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.tab-bar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
  padding: 2rem 0;
}
.wrapper {
  display: flex;
  //   height: 100%;
}

.menu-left {
  height: 100%;
  flex: 3;
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
  flex: 7;
  li {
    border-bottom: 1px solid #eee;
    background: #fff;
    .name {
      padding: 0.5rem;
      background: #eee;
      font-size: 0.8rem;
    }
    ul {
      li {
        position: relative;
        display: flex;
        padding: 0.5rem;
        img {
          height: 3rem;
          width: 3rem;
          margin-right: 0.5rem;
        }
        .wrap-right {
          flex: 1;
        }
        .add-btn {
          position: absolute;
          right: 0.5rem;
          bottom: 0.5rem;
          height: 1rem;
          width: 1rem;
          background: #3190e8;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>