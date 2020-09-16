<template>
<html id="msite">
  <headTop signinUp="true">
    <router-link to="/search" class="link_search" slot="search">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
    </router-link>
    <router-link to="/home" class="address" slot="changecity">{{headerAddress}}</router-link>
  </headTop>

  <div class="wrap_main">
    <!-- 商品分类 -->
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <div class="typelist-li" v-for="item in typeList">
          <img :src="imgBaseUrl+item.image_url" alt />
          <div>{{item.title}}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!-- 附近商家 -->
    <div class="shop_list_container">
      <header class="shop_header">
        <span class="shop_header_title">附近商家</span>
      </header>
      <shopLists :lists="shopList"></shopLists>
    </div>
  </div>

  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
import shopLists from "../../components/common/shopLists";
import { mapState, mapMutations } from "vuex";
import {
  cityGuess,
  msiteAddress,
  msiteFoodTypes,
  shopList
} from "../../service/getData";

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  components: { headTop, footerGuide, Swiper, SwiperSlide, shopLists },
  data() {
    name: "msite";
    return {
      headerAddress: "",
      geohash: "",
      typeList: [],
      shopList: [],
      swiper: [1, 2, 3],
      swiperOption: {
        autoplay: true,
        speed: 1000,
        direction: "horizontal",
        pagination: { el: ".swiper-pagination", clickable: true }
      },
      imgBaseUrl: "https://fuss10.elemecdn.com/"
    };
  },

  created: function() {
    if (!this.$route.query) {
      cityGuess().then(res => {
        this.headerAddress = res.name;
        this.geohash = address.latitude + "," + address.longitude;
      });
    } else {
      this.geohash = this.$route.query.geohash;
    }

    this.SAVE_ADDRESS(this.geohash);
    msiteAddress(this.geohash).then(res => {
      this.headerAddress = res.name;
    });
    
    // 获取分类列表数据
    this.getTypeList();
    //获取附近商铺列表
    this.getShopList();
  },

  methods: {
    ...mapMutations(["SAVE_ADDRESS"]),
    // ...mapState(['geohash']),
    async getTypeList() {
      let res = await msiteFoodTypes(this.geohash);
      if (res.length) {
        this.typeList = res;
        console.log("typeList", this.typeList);
      }
    },
    async getShopList() {
      let res = await shopList(this.geohash);
      this.shopList = res;
      console.log("shopList", this.shopList);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.link_search {
  float: left;
  height: 1rem;
  width: 1rem;
  margin: 0.4rem;
}
.address {
  display: inline-block;
  width: 70%;
  line-height: 2rem;
  font-size: 0.8rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.swiper {
  margin-top: 2rem;
  background-color: #fff;
  border-bottom: 0.025rem solid #e4e4e4;
  height: 10.6rem;
  .swiper-slide {
    height: 100%;
    width: 100%;
  }
}
.shop_list_container {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}

.swiper {
  .swiper-slide {
    display: flex;
    flex-wrap: wrap;
    .typelist-li {
      flex: 1;
      margin: 0.5rem 0;
      img {
        height: 2rem;
        width: 2rem;
        margin: 0 1rem;
      }
      div {
        font-size: 0.7rem;
      }
    }
  }
}
</style>