<template>
  <div class="page main">
    <div class="content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
          <div class="swiper-slide"><img src="../../images/banner1.png" width="100%" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
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
