<template>
<html id="search">
  <headTop :goBack="true" :headTitle="headTitle"></headTop>

  <div class="wrap-search">
    <div class="wrap-input">
      <input type="text" placeholder="请输入商家或者美食名称" v-model="searchName" />
    </div>
    <div class="submit-btn" @click="getSearch">搜索</div>
  </div>

  <div class="wrap-history-list" v-if="showHistoryList&&historyList.length">
    <div class="title">搜索历史</div>
    <div class="history-list">
      <ul v-for="(item,index) in historyList" :key="index">
        <li @click="chooseHistory(item)">
          <p>{{item}}</p>
          <img @click.stop="deleteHistery(index)" src="../../images/close.png" alt />
        </li>
      </ul>
      <p class="clear-btn" v-if="historyList.length" @click="clearHistory">清空搜索历史</p>
    </div>
  </div>

  <div class="resList" v-if="searchRes&&searchRes.length">
    <shopLists :lists="searchRes"></shopLists>
  </div>
  <div class="nodata" v-else-if="noRes===1&&!showHistoryList">很抱歉！暂无搜索结果</div>

  <Toast :showToast="showToast" :text="toastText"></Toast>

  <footerGuide></footerGuide>
</html>
</template>

<script>
import headTop from "../../components/header/head";
import footerGuide from "../../components/footer/footGuide";
import { searchRestaurant } from "../../service/getData";
import shopLists from "../../components/common/shopLists";
import Toast from "../../components/common/toast";
import { mapState, mapMutations } from "vuex";
import { setStore, getStore, removeStore } from "../../config/mUtils";
export default {
  components: { headTop, footerGuide, shopLists, Toast },
  data() {
    return {
      headTitle: "搜索",
      historyList: [],
      showHistoryList: true,
      searchName: "", //搜索关键字
      searchRes: [],
      toastText: "",
      showToast: false,
      noRes: -1
    };
  },
  created: function() {
    this.GET_SEARCHHISTORY();
    this.historyList = this.searchHistory;
  },
  computed: {
    ...mapState(["geohash", "searchHistory"]),
    function() {
      if (this.searchName.length) {
        this.showHistoryList = false;
        this.historyList = this.searchHistory;
      } else {
        this.showHistoryList = true;
        this.searchRes = [];
      }
    }
  },
  watch: {
    function(searchName) {
      if (!this.searchName) {
        this.showHistoryList = true;
      }
    }
  },
  methods: {
    ...mapMutations([
      "SAVE_SEARCHHISTORY",
      "GET_SEARCHHISTORY",
      "CLEAR_SEARCHHISTORY"
    ]),
    async getSearch() {
      if (this.searchName.length) {
        this.SAVE_SEARCHHISTORY(this.searchName);
        let res = await searchRestaurant(this.geohash, this.searchName);
        this.searchRes = [];
        if (!res.length) {
          this.noRes = 1;
        } else {
          this.searchRes = res;
        }
      } else {
        this.showToast = true;
        this.toastText = "输入不能为空";
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    },
    clearHistory() {
      this.CLEAR_SEARCHHISTORY();
      this.historyList = [];
    },
    deleteHistery(index) {
      this.historyList.splice(index, 1);
      setStore("searchHistory", this.historyList);
    },
    async chooseHistory(item) {
      this.searchName=item
      let res = await searchRestaurant(this.geohash, item);
      this.searchRes = [];
      if (!res.length) {
        this.noRes = 1;
      } else {
        this.searchRes = res;
      }
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
  border-bottom: 1px solid #eee;
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
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #fff;
    border-radius: 0.3rem;
    background-color: #3190e8;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
  }
}
.nodata {
  text-align: center;
  padding: 0.5rem;
  background: #fff;
  font-size: 0.8rem;
}
.wrap-history-list {
  padding: 0.5rem 0;
  .title {
    padding: .5rem;
    font-size: .8rem;
    color: #666;
  }
  .history-list {
    ul {
      background: #fff;
      li {
        display: flex;
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
        font-size: .7rem;
        p {
          flex: 1;
        }
        img {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
}
.clear-btn {
  text-align: center;
  padding: 1rem 0;
}
</style>