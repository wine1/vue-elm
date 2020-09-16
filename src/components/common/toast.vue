<template>
  <transition name="fade">
    <div class="toast" v-if="showToast">
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {};
  },

  props: ["text", "showToast"],
  //   components: {},

  computed: {  }

  //   mounted: {},

  //   methods: {}
};
</script>
<style lang='scss' scoped>
.toast {
  position: fixed;
  top: 50vh;
  width: 60vw;
  margin: 0 20vw;
  padding: 0.5rem;
  box-sizing: border-box;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  display: inline-block;
  p {
    color: #fff;
    font-size: 0.8rem;
    text-align: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>