<template>
  <div class="page main">
    <div class="content">
<<<<<<< HEAD
      <swiper :options="swiperOption"  ref="mySwiper">
        <!-- 这部分放你要渲染的那些内容 -->
        <swiper-slide v-for="item in items">
          <img src="../../images/banner1.png" width="100%" alt="">
        </swiper-slide>
        <!-- 这是轮播的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
=======
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
>>>>>>> 1487371c0b76b0751ce3f3403b025aae16403a8b
      <div class="grid-demo">
        <div class="row">
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-1.png"  alt=""><br>
              <span>校园通知</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-2.png"  alt=""><br>
              <span>公文流转</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-3.png"  alt=""><br>
              <span>办公审批</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-4.png"  alt=""><br>
              <span>值班管理</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-5.png"  alt=""><br>
              <span>工资查询</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-6.png"  alt=""><br>
              <span>学生请假</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-7.png"  alt=""><br>
              <span>成绩查询</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-8.png"  alt=""><br>
              <span>问卷调查</span>
            </a>
          </div>
          <div class="col-33">
            <a href="javascript:void(0);" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-9.png"  alt=""><br>
              <span>课程表</span>
            </a>
          </div>
          <div class="col-33">
            <router-link to="/detail" class=" button button-block button-big">
              <span class="wrap"></span>
              <img src="../../images/icon-10.png"  alt=""><br>
              <span>个人信息</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import '@/style/swiper.min.css'
  export default {
    components:{
      swiper,
      swiperSlide
    },
    data(){
      return{
        swiperOption: {
          //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: true,
          paginationClickable: true,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex+1;
            this.index = swiper.realIndex;
          }
        },
        items:[
          {src:'images/banner1.png'},
          {src:'images/banner1.png'},
          {src:'images/banner1.png'}
        ]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted () {
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
      this.swiper.slideTo(0, 0, false);
=======
  import '@/plugins/zepto.min.js'
  import '@/plugins/sm.min.js'
  import '@/plugins/swiper-3.4.2.jquery.min.js'
  import '@/style/swiper.min.css'
  export default {
    mounted(){
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        autoplay:5000,
        autoplayDisableOnInteraction:false,
        loop: true
      });
>>>>>>> 1487371c0b76b0751ce3f3403b025aae16403a8b
    }
  }
</script>

<style lang="scss" scoped>
  /*主页*/
  .main{
    .content{
      background:#fff;
      .grid-demo{
        margin:.5rem;
        .button{
          position:relative;
          .wrap{
            position:absolute;
            display:none;
            top:3.7%;
            left:20%;
            right:20%;
            bottom:10%;
            background:url(../../images/icon_wrap.png) center top no-repeat;
            background-size:100%;
          }
          &:active{
            .wrap{ display:block;}
          }
          &.button-block{
            height:100%;
            font-size:.7rem;
            text-align:center;
            color:#353535;
            border:none;
            line-height:1rem;
            padding:3% 20% 8%;
            img{
              width:100%;
            }
          }
        }
      }
    }
  }
</style>
