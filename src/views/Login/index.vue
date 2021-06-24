<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.current}"
            v-for="(item,index) of menuTab"
            :key="index"
            @click="toggleMenu(item)"
            >{{ item.txt }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      menuTab: [
        {txt: '登录', current: true},
        {txt: '注册', current: false}
      ]
    }
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(item => item.current = false)
      data.current = true
    }
  }
}
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: #3445af;
    .login-wrap {
      width: 330px;
      margin: auto;
      .menu-tab {
        text-align: center;
        li {
          display: inline-block;
          width: 88px;
          line-height: 36px;
          color: white;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
        }
        .current {
          background-color: rgba(0,0,0,.1);
        }
      }
    }
  }
</style>