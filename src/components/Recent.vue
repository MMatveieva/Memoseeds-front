<template>
  <div>
    <div class="card-header header">
      <div class="row">
        <div class="col-sm-1 logo">
          <router-link to="/allModules">
            <img src="../css/images/logo.png">
          </router-link>
        </div>
        <div class="col-sm-3 header-search input-group">
          <input type="text" class="form-control" placeholder="Search">
          <div class="input-group-append search-btn">
            <a href="#">
              <img src="../css/images/search.png">
            </a>
          </div>
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
                <template slot="button-content">{{userName}} user-acc</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/recent">My modules</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <label v-on:click="logOut">Log out</label>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="recent-container row">
      <div class="col-sm-3 recent">
        <div class="recent-title">Transport</div>
        <div class="recent-info">
          <div class="words-info">
            <p>Number of words:</p>
            <label>123/200</label>
          </div>
          <div class="example">
            <p>Example:</p>
            <label>Car, Tram, Vehicle, Airplane, Petrol, Wheels</label>
          </div>
          <button type="submit" class="btn start-btn">START</button>
        </div>
      </div>
      <div class="col-sm-3 recent">
        <div class="recent-title">Transport</div>
        <div class="recent-info">
          <div class="words-info">
            <p>Number of words:</p>
            <label>123/200</label>
          </div>
          <div class="example">
            <p>Example:</p>
            <label>Car, Tram, Vehicle, Airplane, Petrol, Wheels</label>
          </div>
          <button type="submit" class="btn start-btn">START</button>
        </div>
      </div>
      <div class="col-sm-3 recent">
        <div class="recent-title">Transport</div>
        <div class="recent-info">
          <div class="words-info">
            <p>Number of words:</p>
            <label>123/200</label>
          </div>
          <div class="example">
            <p>Example:</p>
            <label>Car, Tram, Vehicle, Airplane, Petrol, Wheels</label>
          </div>
          <button type="submit" class="btn start-btn">START</button>
        </div>
      </div>

    </div>


    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  import router from '../router'

  export default {

    name: "Recent",

    data() {
      return {
        userName: ""
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getUserInfo();
      this.getUserModules();
    },

    methods: {
      getUserInfo: function () {
        this.userName = this.$cookies.get('userName');
      },

      getUserModules: function () {
      },

      logOut: function () {
        this.$cookies.remove("user_session");
        this.$cookies.remove("userName");
        this.$cookies.remove("userCredits");
        this.$cookies.remove("userMail");
        this.$cookies.remove("userId");
        this.$cookies.remove('country');
        router.push('signIn');
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: #12496d;
    padding-top: 0;
    padding-bottom: 0;
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
    line-height: 30px;
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

  /*************************************/

  .recent-container {
    width: 100%;
    margin: auto;
    padding: 70px 0;
  }

  .recent-container .recent {
    margin: auto;
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding: 0 !important;
  }

  .recent .recent-title {
    background-color: #acd8c7;
    color: #ffffff;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 3px;
    height: 70px;
    line-height: 70px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    vertical-align: center;
  }

  .recent .words-info {
    margin-bottom: 10px;
    margin-top: 10px;
    color: #0b486d;
  }

  .recent .words-info p, .recent .example p {
    margin: 0;
  }

  .recent .example {
    color: #0b486d;
    margin-bottom: 10px;
  }

  .recent .recent-info {
    padding: 10px 15px;
    font-size: 16px;
  }

  .start-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 150px;
    height: 20px;
    padding: 0 !important;
    margin-bottom: 5px;
  }

  .recent button:hover {
    background-color: #f56e72 !important;
  }

  /*************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

</style>
