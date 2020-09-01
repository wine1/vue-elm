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
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../../images/people.png" alt />
        </div>
        <div class="swiper-slide">
          <img src="../../images/people.png" alt />
          <!-- <img src="../../static/images/ad2.jpg" alt /> -->
        </div>
      </div>
    </div>
  </div>

  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
// import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "../../../src/config/env";
import { cityGuess } from "../../service/getData";
// import func from "../../../vue-temp/vue-editor-bridge";

// import "../../plugins/swiper.min.js";
// import "../../style/swiper.min.css";

export default {
  components: { headTop, footerGuide },
  data() {
    return {
      headerAddress: "123",
      geohash: ""
    };
  },

  mounted: function() {
    console.log(this.$router.query);
    if (!this.$router.query) {
      cityGuess().then(res => {
        console.log(res);
        this.headerAddress = res.name;
      });
    } else {
      this.geohash = this.$router.query.geohash;
    }

    //初始化swiper
    //var mySwiper= new Swiper(".swiper-container", {
    //   pagination: ".swiper-pagination",
    //   loop: true
    // });
  }
};
</script>

<style lang="scss" scoped>
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
</style>