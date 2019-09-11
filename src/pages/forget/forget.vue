<template>
  <div class="forget">
    <head-top head-title="重置密码" goBack="true"></head-top>
    <form>
      <section class="input-container">
        <input type="text" placeholder="账号" />
      </section>
      <section class="input-container">
        <input type="text" placeholder="旧密码" />
      </section>
      <section class="input-container">
        <input type="text" placeholder="请输入新密码" />
      </section>
      <section class="input-container">
        <input type="text" placeholder="请确认密码" />
      </section>
      <section class="input-container">
        <input type="text" placeholder="请输入验证码" maxlength="4" v-model="codeNumber" />
        <img v-show="captchaCodeImg" :src="captchaCodeImg" />
        <div class="change-img" @click="getCaptchaCode">
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
      <div class="confirm-btn">确认修改</div>
    </form>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
export default {
  data() {
    return {};
  },
  components: {
    headTop
  }
};
</script>
<style lang="scss" scoped>
</style>
