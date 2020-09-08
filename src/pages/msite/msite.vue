<template>
<html id="msite">
  <headTop signinUp="true">
    <router-link to="/search" class="link_search" slot="search">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
    </router-link>
    <router-link to="/home" class="address" slot="changecity">
      <p>{{headerAddress}}</p>
    </router-link>
  </headTop>

  <div class="wrap_main">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <div class="typelist-li" v-for="item in typeList">
          <img :src="item.image_url" alt />
          <div>{{item.title}}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>

  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
// import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "../../../src/config/env";
import { cityGuess, msiteAddress, msiteFoodTypes } from "../../service/getData";

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import func from "../../../vue-temp/vue-editor-bridge";

export default {
  components: { headTop, footerGuide, Swiper, SwiperSlide },
  data() {
    name: "msite";
    return {
      headerAddress: "",
      geohash: "",
      typeList: [],
      swiper: [1, 2, 3],
      swiperOption: {
        autoplay: true,
        speed: 1000,
        direction: "horizontal",
        pagination: { el: ".swiper-pagination", clickable: true }
      }
    };
  },

  mounted: function() {
    if (!this.$route.query) {
      cityGuess().then(res => {
        this.headerAddress = res.name;
      });
    } else {
      this.geohash = this.$route.query.geohash;
      msiteAddress(this.geohash).then(res => {
        this.headerAddress = res.name;
      });
    }

    this.getTypeList();
  },

  methods: {
    async getTypeList() {
      let res = await msiteFoodTypes(this.geohash);
      if (res.length) {
        this.typeList = res;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "swiper/swiper.scss";
.link_search {
  float: left;
  height: 1rem;
  width: 1rem;
  margin: 0.4rem;
}
.address {
  line-height: 2rem;
  font-size: 0.8rem;
  color: #fff;
  p {
    color: #fff;
  }
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
</style>