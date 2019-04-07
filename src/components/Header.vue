<template>
  <div class="card-header header">
    <div class="row">
      <div class="col-sm-1 logo">
        <router-link to="/allModules">
          <img src="../css/images/logo.png">
        </router-link>
      </div>
      <div class="col-sm-3 header-search input-group">
        <form v-on:keyup.enter="searchClick">
          <input type="text" class="form-control" placeholder="Search" v-model="search">
          <!--<div class="input-group-append search-btn" v-on:click="searchClick">-->
          <!--<img src="../css/images/search.png">-->
          <!--</div>-->
        </form>
      </div>
      <div class="col-sm-5 header-text">
        MEMOSEEDS
      </div>
      <div class="col-sm-3 header-user">
        <div class="row">
          <div class="col-sm-6">
            <router-link to="/newModule">
              <img src="../css/images/add-button.png">
            </router-link>
          </div>
          <div class="user-acc col-sm-6">
            <b-dropdown class="user-name" offset="-16">
              <template slot="button-content">{{userName}}</template>
              <router-link to="/settings">
                <b-dropdown-item class="user-dropdown" href="#">Settings</b-dropdown-item>
              </router-link>
              <router-link to="/recent">
                <b-dropdown-item class="user-dropdown" href="#">My modules</b-dropdown-item>
              </router-link>
              <b-dropdown-item class="user-dropdown" href="#">
                <label v-on:click="logOut">Log out</label>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import router from '../router'
  import Header from './Header'

  export default {
    name: "Header",
    components: {
      Header
    },
    data() {
      return {
        modulesNumber: "",
        creditsNumber: "",
        userName: "",

        search: ""
      }
    },

    created: function () {
      this.getUserInfo();
    },

    methods: {
      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      logOut: function () {
        this.$cookies.remove("user_session");
        this.$cookies.remove("userName");
        this.$cookies.remove("userCredits");
        this.$cookies.remove("userMail");
        this.$cookies.remove("userId");
        this.$cookies.remove('country');
        router.push('/');
        router.push('signIn');
      },

      searchClick: function () {
        if (this.search != '') {
          router.push('/');
          router.push('searchResults/' + this.search);
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: #12496d;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 20px;
  }

  .logo img {
    height: 70px;
    width: 70px;
  }

  .header-text {
    text-align: center;
    margin: auto;
    color: white;
    font-weight: 600;
    font-size: 30px;
    letter-spacing: 5px;
  }

  .header-user {
    padding-left: 0;
  }

  .header-user img {
    margin: 8px auto;
    width: 55px;
    height: 55px;
  }

  .header-search {
    margin: auto;
    margin-left: 10px;
  }

  .header-search input {
    border: none;
  }

  .header-search .search-btn {
    background-color: #ffffff;
    padding-top: 1.35%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .header-search .search-btn a {
    padding: 4px;
  }

  .header-search .search-btn img {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .header-text {
    margin-left: -10px;
  }

  .header-user .user-acc {
    margin: auto;
    color: white;
    margin-left: -18px;
    padding-left: 3px;
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

  .user-name a {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name a:hover {
    color: #0b486d !important;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }

</style>
