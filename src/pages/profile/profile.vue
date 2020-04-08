<template>
  <div id="profile">
    <headTop :headTitle=profiletitle goBack="true"></headTop>
    <section class="profile-number">
      <!-- <router-link :to="userInfo&&userInfo.user_id? '/profile/info':'/login'" class="profile-link">
        <img
          :src="imgBaseUrl + userInfo.avatar"
          class="privateImage"
          v-if="userInfo&&userInfo.user_id"
          alt
        />
      </router-link> -->
    </section>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
export default {
  data() {
    return {
      profiletitle: "我的",
      // username: "登录/注册", //用户名
      // resetname: "",
      // mobile: "暂无绑定手机号", //电话号码
      // balance: 0, //我的余额
      // count: 0, //优惠券个数
      // pointNumber: 0, //积分数
      // avatar: "", //头像地址
      // imgBaseUrl:""
    };
  },
  components:{
        headTop
    },
};
</script>

<style>
</style>