<template>
  <html id="order">
    <headTop go-back="true" :head-title="infotitle"></headTop>

    <div class="wrap-main">
      <ul>
          <li v-for="item in orderList"
          :key="item.id" @click="toOrderDetail(item.id)">
            <img :src="imgBaseUrl + item.restaurant_image_url" alt />
            <div class="wrap-right">
              <div class="wrap">
                <p>{{ item.restaurant_name }}</p>
                <p>{{ item.formatted_created_at }}</p>
              </div>
              <div class="wrap">
                <p>{{ item.basket.group[0][0].name }}</p>
                <p v-if="item.basket.group[0].length > 1">
                  等{{ item.basket.group[0].length }}件商品
                </p>
                <p>￥{{ item.basket.packing_fee.price }}元</p>
              </div>
              <div @click.stop="toShop(item.restaurant_id)"
                class="wrap-btn"
                :class="{ redBorder: item.status_bar.title == '等待支付' }"
              >
                <p v-if="item.status_bar.title == '等待支付'">
                  等待支付,还剩{{ timeCount }}
                </p>
                <p v-else>再来一单</p>
              </div>
            </div>
          </li>
      </ul>
    </div>
    <footerGuide></footerGuide>
  </html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
import { getOrderList } from "../../service/getData";
import { imgBaseUrl } from "../../../src/config/env";
import { mapState } from "vuex";
export default {
  components: { footerGuide, headTop },
  data() {
    return {
      infotitle: "订单列表",
      orderList: [], //订单列表
      offset: 0,
      imgBaseUrl,
      timeCount: "", //倒计时
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = res;
      }
    },
    toShop(restaurant_id){
      this.$router.push({path:`/shop?id=${restaurant_id}`})
    },
    toOrderDetail(id) {
      this.$router.push({path:'/order/orderDetail'})
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
#order {
  .wrap-main {
    padding: 2rem 0;
    background: #fff;
    ul {
      li {
        position: relative;
        display: flex;
        padding: 0.75rem;
        border-bottom: 1px solid #eee;
        img {
          height: 4rem;
          width: 4rem;
          margin-right: 0.5rem;
        }
        .wrap-right {
          font-size: 0.8rem;
          .wrap {
            p {
              display: inline-block;
            }
          }
        }
        .wrap-btn {
          @include border_half($blue, 0.2rem);
          position: absolute;
          right: 0.5rem;
          bottom: 0.5rem;
          padding: 0.2rem;
          font-size: 0.6rem;
          z-index: 999;
          p {
            color: $blue;
          }
        }
        .redBorder {
          @include border_half($red, 0.2rem);
          position: absolute;
          p {
            color: $red;
          }
        }
      }
    }
  }
}
</style>