<template>
<html id="order">
  <headTop go-back="true" :head-title="infotitle"></headTop>

  <div class="wrap-mian">
    <ul>
      <li v-for="item in orderList" :key="item.id">
        <img :src="imgBaseUrl+item.restaurant_image_url" alt />
        <div class="wrap-right">
          <div class="wrap">
            <p>{{item.restaurant_name}}</p>
            <p>{{item.formatted_created_at}}</p>
          </div>
          <div class="wrap">
            <p>{{item.basket.group[0].name}}</p>
            <p v-if="item.basket.group.length>1">等{{item.basket.group.length}}件商品</p>
            <p>{{item.basket.packing_fee.price}}元</p>
          </div>
          <p v-if="item.status_bar.title=='等待支付'">等待支付,还剩{{timeCount}}</p>
          <p v-else>再来一单</p>
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
      timeCount:'',//倒计时
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        let res = await getOrderList(this.userInfo.user_id, this.offset);
        this.orderList = res;
        console.log(this.orderList);
      }
    }
  }
};
</script>

<style>
</style>