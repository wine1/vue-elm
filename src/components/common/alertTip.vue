<template>
  <div class="alert">
    <div class="text">{{alertText}}</div>
    <div class="closeAlert" @click="closeTip">确认</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // text: null
    };
  },
  props: ["alertText"],
  methods:{
    closeTip(){
      this.$emit('closeTip')
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 30%;
  width: 70%;
  margin: 0 15%;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.2rem;
  text-align: center;
  .text {
    color: #fff;
    font-size: .7rem;
    line-height: 5rem;
  }
  .closeAlert {
    text-align: center;
    font-size: 0.7rem;
    line-height: 2rem;
    color:#3190e8;
  }
}
</style>
