<template>
<html id="msite">
  <headTop signinUp="true">
    <!-- <router-link :to="/search/geohash" class="link_search" slot="search">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
    </router-link> -->
    <!-- <router-link :to="home" slot="changecity">
      <p>{{headerAddress}}</p>
    </router-link> -->
  </headTop>
  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
// import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "../../../src/config/env";
// import func from "../../../vue-temp/vue-editor-bridge";
export default {
  components: { headTop, footerGuide },
  data() {
    return {
        headerAddress:'123'

    };
  }
};
</script>

<style>
</style>