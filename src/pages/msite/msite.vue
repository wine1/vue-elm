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
    <div class="wrap-typelist">
      <div class="typelist-li" v-for="item in typeList">
        <img :src="imgBaseUrl+item.image_url" alt />
        <div>{{item.title}}</div>
      </div>
    </div>
    <!-- 附近商家 -->
    <div class="shop_list_container">
      <header class="shop_header">
        <span class="shop_header_title">附近商家</span>
      </header>
      <shopLists :lists="shopList" :geohash="this.geohash"></shopLists>
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

export default {
  components: { headTop, footerGuide, shopLists },
  data() {
    name: "msite";
    return {
      headerAddress: "",
      geohash: "",
      typeList: [],
      shopList: [],
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
        this.typeList = res.splice(0,8);
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

.shop_list_container {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    padding:0 .5rem;
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      font-size: 0.8rem;
    }
  }
}

.wrap-typelist {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  background: #fff;
  .typelist-li {
    flex:25%;
    margin: 0.5rem 0;
    text-align:center;
    img {
      height: 2rem;
      width: 2rem;
      // margin: 0 1rem;
    }
    div {
      font-size: 0.7rem;
      text-align: center;
    }
  }
}
</style>