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
        msg: 'Welcome to Memoseeds!'
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

  .user-acc .user-name {
    background-color: transparent !important;
    border: none;
    color: white;
    margin-top: 10px;
  }

  .user-acc .user-dropdown {
    color: #0b486d !important;
  }

  .user-name button {
    background-color: transparent;
    border: none;
    color: #ffffff;
  }

  .user-name a {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name a:hover {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name button:hover {
    background-color: transparent !important;
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }

  .user-name > button :active, .user-name > button :focus {
    background-color: transparent !important;
    text-decoration: underline;
    color: white;
  }

  .user-name > .btn {
    background-color: transparent !important;
    color: white !important;
  }

  .user-name > .dropdown-menu {
    min-width: 7rem;
  }

  .btn-secondary {
    background-color: transparent !important;
    border: none !important;
  }
</style>
