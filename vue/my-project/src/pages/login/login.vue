<template>
  <div class="page login" >
    <div class="content">
      <div class="logo">
        <img src="../../images/logo.png" alt="">
      </div>
      <form action="">
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media">
                  <i class="icon icon-user"></i>
                </div>
                <div class="item-inner">
                  <div class="item-input">
                    <input type="text" placeholder="请输入账号"/>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media">
                  <i class="icon icon-password"></i>
                </div>
                <div class="item-inner">
                  <div class="item-input">
                    <input type="password" placeholder="请输入密码"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p class="content-padded">
          <router-link to="/home" tag="input" value="登录" type="button" class="button button-fill button-big"></router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  /*登录*/
  .login{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: url(../../images/loginBg.png) 0 0 no-repeat;
    background-size:cover;
    .icon-user{
      width:1.5rem;
      height:1.5rem;
      background:url(../../images/user.svg) center center no-repeat;
      background-size:100%;
    }
    .icon-password{
      width:1.5rem;
      height:1.5rem;
      background:url(../../images/password.svg) center center no-repeat;
      background-size:100%;
    }
    .content{
      background:url(../../images/login_footerBg.png) center bottom no-repeat;
      background-size:100%;
      .logo{
        padding-top:19%;
        padding-bottom:5%;
        background:url(../../images/login_logoBg.png) center top no-repeat;
        background-size:100%;
        text-align:center;
        img{
          width:40%;
        }
      }
      .list-block{
        margin:0;
        ul{
          margin:0 .5rem;
          border-radius:10px;
          li{
            padding-left:.75rem;
            &:first-child{
              .item-content{
                position:relative;
                padding:0;
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
          }
          .item-content{
            padding:0;
          }
        }
        .item-inner{
          &:after{
          }
        }
      }
      .content-padded{
        margin-top:.75rem;
        .button{
          border-radius:10px;
          background:#4C99E1;
          &:active{
            background:#3282CD;
          }
        }
      }
    }
  }
</style>
