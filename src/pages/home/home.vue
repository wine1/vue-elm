<template>
  <div id="home">
    <headTop>
      <div slot="logo" class="logo" @click="reload()">ele.me</div>
    </headTop>

    <nav class="city-nav">
      <!-- 这里需要接入定位的api -->
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <!-- 这里需要配置跳转地址啥啥啥的 -->
      <router-link :to="'/city/'+ guessCityid" class="guess-city">
        <span>{{guessCity}}</span>
        <i class="arrow-right"></i>
      </router-link>
    </nav>
    <!-- 热门城市 -->
    <section class="hot-city-container">
      <h4 class="city-title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link tag="li" v-for="item in hotcity" :to="'/city/'+item.id" :key="item.id">{{item.name}}</router-link>
      </ul>
    </section>
    <!-- 按字母排序 -->
    <section class="group-city-container">
      <ul class="letter-classify">
        <li v-for="(value,key,index) in sortgroupcity" :to="'/city/'+item.id" :key="item.id" :key="key" class="letter-classify-li">
          <h4 class="city-title">
            {{key}}
            <span v-if="index==0">（按字母排序）</span>
          </h4>
          <ul class="groupcity-name-container citylistul clear">
            <router-link tag="li" v-for="item in value" :to="/city/" class="ellipsis">{{item.name}}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import headTop from "../../components/header/head";
import { cityGuess, hotcity, groupcity } from "../../service/getData";

export default {
  name: "home",
  components: {
    headTop
  },
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市
      groupcity: [] //所有城市列表
    };
  },

  mounted() {
    // 获取默认城市
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
      console.log(res);
    });
    // 获取热门城市列表
    hotcity().then(res => {
      this.hotcity = res;
      console.log(res);
    });
    // 获取城市列表
    groupcity().then(res => {
      this.groupcity = res;
      console.log(res);
    });
  },

  computed: {
    // 将获取到的城市列表按照字母顺序排列
    sortgroupcity() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    }
  },
  
  methods:{
    // 点击logo刷新页面
    reload(){
      window.location.reload();
    }
  }
};
</script>



<style lang="scss" scoped>
.logo {
  left: 0.4rem;
  font-weight: 400;
  font-size: 0.7rem;
  color: #fff;
  width: 2.3rem;
  height: 0.7rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.city-nav {
  margin: 2rem 0 0.5rem;
  background: #f7f8fa;
  .city-tip {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 0.5rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    span {
      height: 2rem;
      line-height: 2rem;
      font-size: 0.55rem;
      color: #333;
      &:last-of-type {
        float: right;
        color: #666;
        font-size: 0.45rem;
      }
    }
  }
  .guess-city {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    font: 0.75rem/1.8rem Microsoft YaHei;
    text-decoration: none;
    background: #fff;
    span {
      color: #3190e8;
    }
  }
}
.hot-city-container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.city-title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font: 0.55rem/1.45rem Helvetica Neue;
  text-align: left;
  background: #fff;
}

.citylistul {
  padding: 0;
  background: #fff;
  li {
    float: left;
    text-align: center;
    color: #3190e8;
    border-bottom: 0.025rem solid #e4e4e4;
    border-right: 0.025rem solid #e4e4e4;
    box-sizing: border-box;
    width: 25%;
    height: 1.75rem;
    font: 0.6rem/1.75rem Microsoft YaHei;
  }
}

.groupcity-name-container {
  li {
    color: #333;
  }
}
</style>
