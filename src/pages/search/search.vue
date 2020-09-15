<template>
<html id="search">
  <headTop :goBack="true" :headTitle="headTitle"></headTop>

  <div class="wrap-search">
    <div class="wrap-input">
      <input type="text" placeholder="请输入商家或者美食名称" v-model="searchName" />
    </div>
    <div class="submit-btn">搜索</div>
  </div>

  <div class="wrap-history-list" v-if="historyList.length">
    <div class="title">搜索历史</div>
    <div class="history-list">
      <ul v-for="item in historyList">
        <li></li>
      </ul>
    </div>
  </div>

  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
import {searchRestaurant} from "../../service/getData"
export default {
  components: { headTop, footerGuide },
  data() {
    return {
      headTitle: "搜索",
      historyList:[],
      searchName:'',//搜索关键字
    };
  },

  methods:{
    async getSearch() {
      let res=await searchRestaurant()
    }
  }
};
</script>

<style lang='scss' scoped>
#search {
  margin: 2rem 0;
}
.wrap-search {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #fff;
  .wrap-input {
    flex: 1;
    padding: 0.2rem;
    border: 1px solid #eee;
    background: #eee;
    border-radius: 0.3rem;
    font-size: 0;
    input {
      border: 0;
      font-size: 0.8rem;
      width: 100%;
      background: transparent;
    }
  }
  .submit-btn {
    border: 1px solid #3190e8;
    margin-left: .5rem;
    font-size: 0.8rem;
    color: #fff;
    border-radius: 0.3rem;
    background-color: #3190e8;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
  }
}
</style>