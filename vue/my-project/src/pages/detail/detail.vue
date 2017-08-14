<template>
  <div class="page user_info">
    <div class="content">
      <div class="header-top teacher">
        <div class="info_photo">
          <img src="../../images/photo1.png" alt="">
        </div>
        <p class="user_name">
          黎小佳
        </p>
        <p class="school">
          武汉楚才中学
        </p>
      </div>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media">
                帐号：
              </div>
              <div class="item-inner">
                <div class="item-text">
                  zhang46446296
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media">
                任教：
              </div>
              <div class="item-inner">
                <div class="item-text">
                  <p>初一（4）班<span>语文</span></p>
                  <p>初一（2）班<span>历史</span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-padded">
        <router-link to="/login" class="button-big button button-fill">
          退出登录
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>
<style lang="scss" scoped>
  /*个人信息*/
  .user_info{
    background:#fff;
    .header-top{
      padding-top:10%;
      text-align:center;
      min-height:10rem;
      &.teacher{
        background:url(../../images/infoBg1.png) center top no-repeat;
        background-size:cover;
      }
      &.student{
        background:url(../../images/infoBg2.png) center top no-repeat;
        background-size:cover;
      }
      &.patriarch{
        background:url(../../images/infoBg3.png) center top no-repeat;
        background-size:cover;
      }
      p{
        margin:0;
        &.user_name{
          margin-top:.5rem;
          font-size:1rem;
          color:#353535;
        }
        &.school{
          font-size:.85rem;
          color:#555;
        }
      }
      .info_photo{
        display:inline-block;
        text-align:center;
        line-height:4rem;
        width:4rem;
        height:4rem;
        padding:.3rem;
        border-radius:50%;
        overflow:hidden;
        background:#fff;
        img{
          width:3.4rem;
          height:3.4rem;
          border-radius:50%;
        }
      }
    }
    .list-block{
      margin:0;
      ul{
        &:before,&:after{
          display:none;
        }
        li{
          &:first-child{
            .item-content{
              &:after{
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                right: auto;
                top: auto;
                height: 1px;
                width: 100%;
                background-color: #e7e7e7;
                display: block;
                z-index: 15;
                -webkit-transform-origin: 50% 100%;
                transform-origin: 50% 100%;
              }
            }
          }
          &:last-child{
            .item-content{
              align-items:start;
              -webkit-align-items:flex-start;
              .item-inner{
                padding-top:0;
              }
            }
          }
        }
      }
    }
    .item-content{
      padding:.5rem .75rem;
      .item-media{
        color:#A1A1A1;
        font-size:.85rem;
      }
      .item-inner{
        &:after{
          display:none;
        }
        .item-text{
          color:#353535;
          height:auto;
          font-size:.85rem;
          p{
            margin:0;
            line-height:2rem;
            span{
              margin-left:1rem;
            }
          }
        }
      }
    }
    .button-big{
      background:#4C99E1;
      &:active{
        background:#3282CD;
      }
    }
  }
</style>

