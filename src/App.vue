<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'Aqua Grotesque';
    src: url("css/fonts/aqua.ttf");
  }

  body {
    font-family: 'Aqua Grotesque', regular !important;
  }

  body.home {
    background: url("css/images/background.png") center no-repeat;
  }
  body.inside {
    background: #f5f5f7;
  }

  .logo img {
    width: 100px;
    height: 100px;
  }
</style>
