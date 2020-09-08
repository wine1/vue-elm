<template>
  <div id="city">
    <headTop :headTitle="cityname" goBack="true">
      <router-link to="/home" class="change-city" slot="changecity">切换城市</router-link>
    </headTop>

    <form class="city-form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入学校、商务楼、地址"
          class="city-input input-style"
          required
          v-model="inputValue"
        />
        <input
          type="submit"
          name="submit"
          class="city-submit input-style"
          @click="postpois"
          value="提交"
        />
      </div>
    </form>

    <header v-if="historytitle" class="pois-search-history">搜索历史</header>

    <ul class="getpois_ul" v-if="placelist&&placelist.length">
      <li v-for="(item,index) in placelist" @click="nextpage( item.geohash)" :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>

    <footer v-if="historytitle && placelist.length" class="clear-all-history" @click="clearAll">清空所有</footer>

    <div class="search-none-place" v-if="placeNone">很抱歉！暂无搜索结果</div>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import {
  currentcity,
  searchPlace,
  msiteAddress
} from "../../../src/service/getData";
import { getStore, setStore, removeStore } from "../../config/mUtils";

export default {
  name: "city",
  components: {
    headTop
  },

  data() {
    return {
      inputValue: "",
      cityid: "",
      cityname: "",
      placelist: [],
      historytitle: false,
      placeNone: false
    };
  },

  mounted() {
    this.cityid = this.$route.params.cityid;
    currentcity(this.cityid).then(res => {
      this.cityname = res.name;
    });
  },

  methods: {
    postpois() {
      if (this.inputValue) {
        searchPlace(this.cityid, this.inputValue).then(res => {
          this.placelist = res;
          console.log(res);
        });
      } else {
        return;
      }
    },

    nextpage(geohash) {
      // msiteAddress(geohash).then(res => {
      //   console.log(res);
      //   let addressDetail = res;
      // });
      console.log(geohash)
      this.$router.push({
        path: `/msite`,
        query: { geohash }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.city-form {
  margin-top: 2.3rem;
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding-top: 0.4rem;
  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  .input-style {
    border-radius: 0.1rem;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 1.4rem;
  }
  .input-style {
    border: 0;
  }
  .city-input {
    border: 1px solid #e4e4e4;
    padding: 0 0.3rem;
    font-size: 0.65rem;
    color: #333;
    box-sizing: border-box;
  }
  .city-submit {
    background-color: #3190e8;
    font-size: 0.65rem;
    color: #fff;
  }
}

.pois_search_history {
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding-left: 0.5rem;
  font: 0.475rem/0.8rem Microsoft YaHei;
}

.getpois_ul {
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  text-align: left;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid #e4e4e4;
  }
}
.pois_name {
  margin: 0 auto 0.35rem;
  width: 90%;
  font-size: 0.65rem;
  color: #333;
}
.pois_address {
  width: 90%;
  margin: 0 auto 0.55rem;
  font-size: 0.45rem;
  color: #999;
}
</style>