<template>
  <div>
    <div class="card-header header ">
      <div class="row">
        <div class="col-sm-1 logo">
          <img src="../css/images/logo.png">
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
              <div class="user-photo-header">
              </div>
            </div>
            <div class="user-acc col-sm-6">
              <b-dropdown class="user-name" offset="-16">
                <template slot="button-content">user-acc</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>

                <router-link to="/myModules">
                  <b-dropdown-item class="user-dropdown" href="#">My modules</b-dropdown-item>
                </router-link>
                <router-link to="/signUp">
                  <b-dropdown-item class="user-dropdown" href="#">Log out</b-dropdown-item>
                </router-link>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-3 info-part">
            <h2 class="modules-title">Transport</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules1">{{wordsNumber}}</label>
            </div>
          </div>

          <div class="col-sm-9 actions-part">
            <div class="row">
              <div class="col-sm-8 action-text">
                Car, tram, vehicle, airplane railway station, petrol
              </div>
              <div class="col-sm-4 btn-container">
                <button type="submit" class="btn action-btn" v-on:click="matchClick">
                  <router-link to="/module">START</router-link>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-3 info-part">
            <h2 class="modules-title">Wildlife</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules2">{{wordsNumber}}</label>
            </div>
          </div>

          <div class="col-sm-9 actions-part">
            <div class="row">
              <div class="col-sm-8 action-text">
                Species, habitat, ecosystem, recreation, forest
              </div>
              <div class="col-sm-4 btn-container">
                <button type="submit" class="btn action-btn" v-on:click="matchClick">
                  <router-link to="/module">START</router-link>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-3 info-part">
            <h2 class="modules-title">Family</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules3">{{wordsNumber}}</label>
            </div>
          </div>

          <div class="col-sm-9 actions-part">
            <div class="row">
              <div class="col-sm-8 action-text">
                Marriage, household, vehicle, airplane railway station, petrol
              </div>
              <div class="col-sm-4 btn-container">
                <button type="submit" class="btn action-btn" v-on:click="matchClick">
                  <router-link to="/module">START</router-link>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModulePage",

    data() {
      return {
        wordsNumber: 0,
        creditsNumber: 0
      }
    },
    methods: {

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

  .header-user .user-photo-header {
    margin: 5px auto;
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
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

  /***********************************************/

  .actions-part .action-text{
    margin: auto;
  }

  .actions-part .btn-container{
    margin: auto;
  }

  /*********************************/

  .btn:hover {
    color: white !important;
    background: #12587c !important;
    text-decoration: none;
    cursor: pointer;
  }

  .settings-form {
    padding: 30px 40px;
    margin-top: 10px;
  }

  .info-part {
    background: #acd8c7;
    width: 20%;
    color: #ffffff;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-align: center;
    align-content: center;
  }

  .info-part p {
    margin-bottom: 0;
  }

  .modules-title {
    margin-top: 10%;
  }

  .modules-words {
    margin-left: 15%;
    font-size: 20px;
    color: #0b486d;
    font-weight: 500;
  }

  .modules-info {
    font-size: 100%;
    color: #12496d;
  }

  .words-form {
    width: 70%;
    margin: auto;
    margin-bottom: 25px;
  }

  .words-form .word-num {
    color: #12496d;
    padding-right: 0;
    text-align: center;
  }

  .words-form .word {
    text-align: left;
  }

  .words-form .word-def {
    text-align: right;
    padding-right: 50px;
  }

  .settings-form .actions-part {
    background: #eeeeee;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
    flex: 0 0 70%;
  }

  .module-words-inside {
    background: #eeeeee;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .module-words-inside h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #12496d;
  }

  .actions-part .action-btn {
    background-color: #12496d !important;
    border-radius: 20px;
    font-size: 15px;
    color: white;
    width: 120px;
    height: 30px;
    border-color: white;
    margin: 0;
  }

  .module-words-inside button:hover {
    background-color: #12496d !important;
    cursor: pointer;
  }

  /***********************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .hidden {
    display: none;
  }

</style>
