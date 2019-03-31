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
                <template slot="button-content">{{userName}}</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/recent">My modules</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/signIn" v-on:click="logOut">Log out</router-link>
                </b-dropdown-item>
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
            <h2 class="modules-title">{{moduleName}}F</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules1">{{wordsAll}}</label>
            </div>
            <h2 class="modules-title">Writing</h2>
            <div class="modules-info">
              <p>Left:</p>
              <label id="modules2">{{wordsLeft}}</label>
            </div>
            <div class="modules-info">
              <p>Correct:</p>
              <label id="modules3">{{wordsCorrect}}</label>
            </div>
            <div class="modules-info">
              <p>Incorrect:</p>
              <label id="modules4">{{wordsIncorrect}}0</label>
            </div>
          </div>


          <div class="col-sm-9 actions-part">
            <div class="carousel-wrapper">
              <b-carousel
                id="module-carousel"
                controls
                background="white"
                :interval="40000"
                v-model="slide"
                img-height="90"
                img-width="200"
              >

                <b-carousel-slide img-blank img-alt="Sibling">
                  <div class="card-title">Your brother's wife</div>
                  <div class="row action-service">
                    <div class="col-sm-9 words-num">{{wordNow}}/{{wordsAll}}</div>
                    <div class="col-sm-3 btn-container">
                      <button type="submit" class="btn next-btn" v-on:click="translateClick">
                        SEE TRANSLATION
                      </button>
                    </div>
                  </div>
                </b-carousel-slide>

                <b-carousel-slide img-blank img-alt="Father">
                  <div class="card-title">Your brother's wife</div>
                  <div class="row action-service">
                    <div class="col-sm-9 words-num">{{wordNow}}/{{wordsAll}}</div>
                    <div class="col-sm-3 btn-container">
                      <button type="submit" class="btn next-btn" v-on:click="translateClick">
                        SEE TRANSLATION
                      </button>
                    </div>
                  </div>
                </b-carousel-slide>

                <b-carousel-slide img-blank img-alt="Brother">
                  <div class="card-title">Your brother's friend</div>
                  <div class="row action-service">
                    <div class="col-sm-9 words-num">{{wordNow}}/{{wordsAll}}</div>
                    <div class="col-sm-3 btn-container">
                      <button type="submit" class="btn next-btn" v-on:click="translateClick">
                        SEE TRANSLATION
                      </button>
                    </div>
                  </div>
                </b-carousel-slide>

              </b-carousel>
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
  import router from '../router';

  export default {
    name: "ModulePage",

    data() {
      return {
        wordsNumber: "",
        wordsAll: "",
        wordNow: "",

        moduleName: "",
        wordsLeft: "",
        wordsCorrect: "",
        wordsIncorrect: "",
        wordDef: ""
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    methods: {
      translateClick: function () {

      }
    }
  }
</script>

<style>
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

  .header-search {
    margin: auto;
    margin-left: 10px;
  }

  .header-search input {
    border: none;
  }

  .carousel-wrapper {
    width: 100%;
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

  .header-user img {
    margin: 8px auto;
    width: 55px;
    height: 55px;
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

  .settings-form .actions-part {
    background: #ffffff;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 40px;
    padding-bottom: 8px;
    text-align: center;
    flex: 0 0 70%;
  }

  .actions-part .card-title {
    color: #0b486d;
    font-size: 1.7rem;
    font-weight: 500;
  }

  .actions-part .btn-container {
    margin-left: -85px;
  }


  .actions-part .words-num {
    color: #2095a6;
    font-size: 15px;
    margin-left: 40px;
  }

  .actions-part .action-service {
    margin-top: 40px;
  }

  /*********************************/

  .btn:hover {
    color: white !important;
    text-decoration: none;
    cursor: pointer;
  }

  .settings-form {
    padding: 30px 40px;
    margin-top: 10px;
  }

  .info-part {
    background: #acd8c7;
    color: #ffffff;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-align: center;
    box-sizing: content-box;
  }

  .info-part p {
    margin-bottom: 0;
  }

  .info-part label {
    margin: 0.1rem;
  }

  .modules-title {
    margin-top: 7%;
  }

  .modules-info {
    font-size: 100%;
    color: #12496d;
  }

  .actions-part .next-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    width: 180px;
    height: 25px;
    border-color: white;
    margin: 0;
    padding-top: 3px;
  }

  .actions-part button:hover {
    color: white !important;
    background: #f56e72 !important;
    text-decoration: none;
  }

  /********************************/

  /*.w-100{*/
  /*width: 0 !important;*/
  /*}*/

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e")
  }

  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
  }

  /***********************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
  }

  .hidden {
    display: none;
  }

</style>
