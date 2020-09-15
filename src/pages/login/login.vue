<template>
  <div id="login" class="paddingTop">
    <headTop goBack="true" :headTitle="loginWay?'登陆':'密码登陆'"></headTop>

    <form class="loginForm" v-if="loginWay">
      <section class="input-container">
        <input type="text" placeholder="手机号登陆" name="phone" maxlength="11" v-model="phoneNumber" />
        <button @click.prevent="getVerifyCode" class="send-btn1" v-show="!computedTime">获取验证码</button>
        <button @click.prevent class="send-btn2" v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input-container">
        <input type="text" placeholder="验证码" maxlength="6" v-model="mobileCode" />
      </section>
    </form>

    <form class="loginForm" v-else>
      <section class="input-container">
        <input type="text" placeholder="请输入您的账号" v-model="userAccount" />
      </section>
      <section class="input-container">
        <input type="text" placeholder="请输入您的密码" v-model="passWord" />
        <div class="button-switch" @click="buttonSwitch">
          <div class="circle-btn"></div>
          <span>abc···</span>
        </div>
      </section>
      <section class="input-container">
        <input type="text" placeholder="请输入验证码" maxlength="4" v-model="codeNumber" />
        <img v-show="captchaCodeImg" :src="captchaCodeImg" />
        <div class="change-img" @click="getCaptchaCode">
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
    </form>
    <div class="login-tips">温馨提示：未注册过的账号，登录时将自动注册</div>
    <div class="login-tips">注册过的用户可凭账号密码登录</div>
    <div class="login-btn" @click="mobileLogin">登陆</div>
    <router-link class="reset-password" to="/forget" v-if="!loginWay">重置密码</router-link>

    <alertTip v-if="showAlert" :alertText="alertText" @closeTip="closeTip"></alertTip>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import alertTip from "../../components/common/alertTip";
import { getcaptchas, accountLogin } from "../../service/getData";
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  components: {
    headTop,
    alertTip
  },
  data() {
    return {
      loginWay: false, // 登录方式 true为手机号登陆 false为账号密码登陆
      phoneNumber: "", //电话号码
      mobileCode: "", //短信验证码
      computedTime: "", //倒数计时
      captchaCodeImg: "", //验证图片
      userAccount: "", //用户名
      passWord: "", //密码
      codeNumber: "", //验证码
      userInfo: null, //用户信息
      showAlert: false,
      alertText: null
    };
  },

  created() {
    this.getCaptchaCode();
  },
  computed: {
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.phoneNumber);
    }
    // ...mapState({})
  },

  methods: {
    ...mapMutations(["RECORD_USERINFO", "GET_USERINFO"]),
    // 获取验证码
    async getCaptchaCode() {
      let res = await getcaptchas();
      this.captchaCodeImg = res.code;
    },
    buttonSwitch() {},
    getVerifyCode() {},
    closeTip() {
      this.showAlert = false;
    },
    async mobileLogin() {
      if (this.loginWay) {
        console.log("手机号登陆");
      } else {
        if (!this.userAccount) {
          this.showAlert = true;
          this.alertText = "请输入用户名";
          console.log("请输入用户名");
        } else if (!this.passWord) {
          this.showAlert = true;
          this.alertText = "请输入密码";
          console.log("请输入密码");
          return;
        } else if (!this.codeNumber) {
          this.showAlert = true;
          this.alertText = "请输入验证码";
          console.log("请输入验证码");
          return;
        } else {
          this.userInfo = await accountLogin(
            this.userAccount,
            this.passWord,
            this.codeNumber
          );
          console.log(this.userInfo);
        }

        // setTimeout(function() {
        //   this.showAlert = false;
        // }, 3000);
      }
      if (!this.userInfo.user_id) {
        this.showAlert = true;
        this.alertText = this.userInfo.message;
        if (!this.loginWay) this.getCaptchaCode();
      } else {
        this.RECORD_USERINFO(this.userInfo);
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loginForm {
  margin-top: 0.8rem;
  background: #fff;
  .input-container {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    padding: 0.3rem 1rem;
    box-sizing: border-box;
    text-align: left;
    input {
      font-size: 0.7rem;
    }
  }
}
.login-tips {
  margin-left: 1rem;
  text-align: left;
  font-size: 0.6rem;
  color: red;
}
.login-btn {
  width: 90%;
  margin: 1rem 5%;
  padding: 0.3rem 0;
  background: #3190e8;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 0.1rem;
}
.reset-password {
  font-size: 0.6rem;
  float: right;
  margin-right: 1rem;
}

.button-switch {
  float: right;
  margin-top: 0.3rem;
  position: relative;
  background-color: #ccc;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  width: 2rem;
  height: 0.7rem;
  padding: 0 0.2rem;
  border: 1px;
  border-radius: 0.5rem;
  .circle-btn {
    position: absolute;
    top: -0.2rem;
    left: -0.2rem;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: #eee;
  }
  span {
    display: inline-block;
    font-size: 0.4rem;
    line-height: 0.6rem;
    height: 0.6rem;
    color: #333;
  }
}
.change-img {
  float: right;
  p {
    font-size: 0.6rem;
    &:last-of-type {
      color: #3190e8;
    }
  }
}
.send-btn1 {
  float: right;
  height: 1.3rem;
  padding: 0 0.2rem;
  font-size: 0.7rem;
  border-radius: 0.1rem;
  background: #3190e8;
  color: #fff;
}
.send-btn2 {
  float: right;
  height: 1.3rem;
  padding: 0 0.2rem;
  font-size: 0.7rem;
  border-radius: 0.1rem;
  background: #eee;
  color: #333;
}
</style>
