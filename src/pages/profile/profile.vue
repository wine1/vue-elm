<template>
  <div id="profile">
    <headTop go-back="true" :head-title="profiletitle"></headTop>
    <section class="profile-number">
      <router-link :to="userInfo&&userInfo.user_id? '/profile/info':'/login'" class="profile-link">
        <img
          :src="imgBaseUrl + userInfo.avatar"
          class="privateImage"
          v-if="userInfo&&userInfo.user_id"
          alt
        />
        <div class="userinfo">
          <div class="username">{{username}}</div>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "../../../src/config/env";
export default {
  components: { headTop },
  data() {
    return {
      profiletitle: "我的",
      imgBaseUrl,
      username: "登录/注册", //用户名
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.getUserInfo();
  },
  props: [],

  methods: {}
};
</script>

<style lang="scss" scoped>
.profile-link {
  background: #3381e3;
}
</style>