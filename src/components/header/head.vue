<template>
  <div id="head-top">
    <slot name="logo"></slot>
    <div class="entrance">
      <div class="entrance-icon"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "headTop",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#head-top {
  position: fixed;
  width: 100%;
  height: 2rem;
  top: 0;
  left: 0;
  background: #3190e8;

  .entrance-icon {
    float: right;
    margin: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: url("../../images/people.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
