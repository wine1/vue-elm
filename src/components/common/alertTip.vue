<template>
  <div class="alert">
<<<<<<< HEAD
    <div class="text">{{text}}</div>
=======
    <div class="text">{{alertText}}</div>
    <i class="closeAlert"></i>
>>>>>>> f91e6c5f59fd49370122ec8a8d72583adda7af0e
  </div>
</template>

<script>
export default {
  data() {
    return {
      // text: null
    };
  },
  props: ["text"]
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
