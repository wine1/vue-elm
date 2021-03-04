
<template>
<html id="info">
  <!-- <headTop></headTop>
  <footerGuide></footerGuide>-->
  <div>
    <button @click="loginout">退出登陆</button>
  </div>
</html>
</template>

<script>
import headTop from "../../../components/header/head";
import footerGuide from "../../../components/footer/footGuide";
import { mapState, mapMutations } from "vuex";
export default {
  components: { headTop, footerGuide },

  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    loginout() {
      this.OUT_LOGIN()
      console.log('注销登陆')
    },
  },
};
</script>

<style>
</style>