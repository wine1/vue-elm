<template>
  <div class="alert">
    <div class="text">{{alertText}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false,
      alertText: null
    };
  },
  props: ["alertText"]
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 30%;
  width: 70%;
  height: 8rem;
  margin: 0 15%;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.2rem;
  text-align: center;
  line-height: 8rem;
  .text {
      color:#fff;
      font-size: .7rem;
  }
}
</style>
