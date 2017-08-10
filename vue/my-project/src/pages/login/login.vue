<template>
  <div>
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
        <router-link to="/home" type="button" tag="input" class="button button-fill button-big" value="登录"></router-link>
      </p>
    </form>
  </div>
</template>

<script>
  export default {

  }
</script>
