<template>
  <div class="page-group">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import 'plugins/zepto.min.js'
  import 'plugins/sm.min.js'
export default {
}
</script>

<style lang="scss" scoped>
  @import "style/sm.min.css";
  .page{ display:block;}
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .swiper-container{
    padding-bottom:0;
  }
  .swiper-container-horizontal > .swiper-pagination{
    bottom:.3rem;
  }
</style>
