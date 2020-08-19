<template>
  <div id="head-top">
    <slot class="" name="logo"></slot>
    <slot name="search">
    </slot>

    <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
      <i class="arrow-left"></i>
    </section>

    <section class="title-head" v-if="headTitle">
      <span class="title-text">{{headTitle}}</span>
    </section>

    <router-link :to="userInfo? '/profile':'/login'" v-if="signinUp" class="head-login">
      <div v-if="signinUp" class="head-login">
        <div class="user_avatar" v-if="userInfo">
          <img src="../../images/people.png" alt />
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
        </div>
        <span class="login-span" v-else>登录|注册</span>
      </div>
    </router-link>

    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </div>
</template>


<script>
import { imgBaseUrl } from "../../../src/config/env";
import { mapState, mapActions } from "vuex";
export default {
  name: "headTop",
  data() {
    return {
      imgBaseUrl
    };
  },
  mounted() {
    this.getUserInfo();
  },
  props: ["goBack", "headTitle", "signinUp"],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
#head-top {
  position: fixed;
  width: 100%;
  height: 2rem;
  top: 0;
  left: 0;
  background: #3381e3;
  border-bottom: 1px solid #eee;

  .entrance-icon {
    float: right;
    margin: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: url("../../images/people.png") no-repeat;
    background-size: 100% 100%;
  }

  .title-head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title-text {
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
  .head-goback {
    left: 0.4rem;
    width: 0.6rem;
    height: 1rem;
    line-height: 2.2rem;
    margin-left: 0.4rem;
  }
  .change-city {
    right: 0.4rem;
    font-size: 0.6rem;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .head-login {
    float: right;
    margin-right: 0.2rem;
    height: 2rem;
    line-height: 2rem;
    .login-span {
      color: #fff;
      font-size: 0.15rem;
    }
  }
  .user_avatar {
    height: 1rem;
    width: 1rem;
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
