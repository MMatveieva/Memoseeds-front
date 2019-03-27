<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import signUp from './components/SignUp.vue';

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:
      {
        signUp: signUp
      }
  }
</script>

<style>
  body {
    font-family: 'Aqua Grotesque', regular;
  }

  .logo img {
    width: 100px;
    height: 100px;
  }
</style>
