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
        <span class="privateImage" v-else>
          <svg class="privateImage-svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default" />
          </svg>
        </span>
        <div class="user-info">
          <p class="username">{{username}}</p>
          <p>
            <span class="user-icon">
              <!-- <svg class="icon-mobile" fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile" />
              </svg>-->
              <div class="icon-mobile"></div>
            </span>
            <span class="icon-mobile-number">{{mobile}}</span>
          </p>
        </div>
        <span class="arrow">
          <svg class="arrow-svg" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
          </svg>
        </span>
      </router-link>
    </section>
    <footerGuide></footerGuide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "../../../src/config/env";
// import func from "../../../vue-temp/vue-editor-bridge";
export default {
  components: { headTop, footerGuide },
  data() {
    return {
      profiletitle: "我的",
      username: "登录/注册", //用户名
      resetname: "",
      mobile: "暂无绑定手机号", //电话号码
      balance: 0, //我的余额
      count: 0, //优惠券个数
      pointNumber: 0, //积分数
      avatar: "", //头像地址
      imgBaseUrl,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    this.GET_USERINFO();
    this.initData();
  },
  props: [],

  methods: {
    ...mapMutations(["GET_USERINFO"]),
    initData() {
      if (this.userInfo && this.userInfo.user_id) {
        this.avatar = this.userInfo.avatar;
        this.username = this.userInfo.username;
        this.mobile = this.userInfo.mobile || "暂无绑定手机号";
        this.balance = this.userInfo.balance;
        this.count = this.userInfo.gift_amount;
        this.pointNumber = this.userInfo.point;
      } else {
        this.username = "登录/注册";
        this.mobile = "暂无绑定手机号";
      }
    },
  },
  watch: {
    userInfo: function (value) {
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.profile-link {
  background: #3381e3;
}
.profile_page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.profile-number {
  padding-top: 1.95rem;
  .profile-link {
    display: block;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.666667rem 0.6rem;
    .privateImage {
      display: inline-block;
      @include wh(2.5rem, 2.5rem);
      border-radius: 50%;
      vertical-align: middle;
      background: url("../../images/avatar.jpg") no-repeat;
      background-size: 100% 100%;
      .privateImage-svg {
        background: $fc;
        border-radius: 50%;
        @include wh(2.5rem, 2.5rem);
      }
    }
    .user-info {
      margin-left: 0.48rem;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      text-align: left;
      p {
        font-weight: 700;
        @include sc(0.8rem, $fc);
        .user-icon {
          @include wh(1rem, 0.75rem);
          display: inline-block;
          vertical-align: middle;
          line-height: 0.75rem;
          .icon-mobile {
            @include wh(100%, 100%);
            background: url("../../images/phone.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .icon-mobile-number {
          display: inline-block;
          @include sc(0.57333rem, $fc);
        }
      }
    }
    .arrow {
      @include wh(0.46667rem, 0.98rem);
      display: inline-block;
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}
</style>