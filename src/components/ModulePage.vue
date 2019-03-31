<template>
  <div>
    <Header></Header>

    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-3 info-part">
            <h2 class="modules-title">{{moduleName}}Family</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules">{{wordsNumber}}100</label>
            </div>
          </div>
          <div class="col-sm-9 actions-part">
            <button type="submit" class="btn action-btn" v-on:click="learnClick" v-bind:disabled=!added>Learn</button>
            <button type="submit" class="btn action-btn" v-on:click="writeClick" v-bind:disabled=!added>Write</button>
            <button type="submit" class="btn action-btn" v-on:click="testClick" v-bind:disabled=!added>Test</button>
          </div>

        </div>
      </div>

      <!--<div class="carousel-wrapper">-->
        <!--<b-carousel-->
          <!--id="module-carousel"-->
          <!--controls-->
          <!--background="#C5EED7"-->
          <!--:interval="40000"-->
          <!--v-model="slide"-->
          <!--img-height="130"-->
          <!--img-width="200"-->
        <!--&gt;-->

          <!--<b-carousel-slide img-blank img-alt="Sibling">-->
            <!--<div class="card-title">Sibling</div>-->
            <!--<div class="card-num">22/200</div>-->
          <!--</b-carousel-slide>-->

          <!--<b-carousel-slide img-blank img-alt="Father">-->
            <!--<div class="card-title">Father</div>-->
            <!--<div class="card-num">23/200</div>-->
          <!--</b-carousel-slide>-->

          <!--<b-carousel-slide img-blank img-alt="Brother">-->
            <!--<div class="card-title">Brother</div>-->
            <!--<div class="card-num">24/200</div>-->
          <!--</b-carousel-slide>-->

        <!--</b-carousel>-->
      <!--</div>-->

      <div class="modules-words">
        Words in this set:
      </div>
      <div class="words-form row">
        <div class="col-sm-1 module-words-inside word-num">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div class="col-sm-5 module-words-inside word" id="words">
          <div>Word from set</div>
          <div>Word from set</div>
          <div>Word from set</div>
        </div>
        <div class="col-sm-6 module-words-inside word-def" id="definition">
          <div>Translation or definition</div>
          <div>Translation or definition</div>
          <div>Translation or definition</div>
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
  import Header from './Header'

  export default {
    name: "ModulePage",
    components: {
      Header
    },
    data() {
      return {
        wordsNumber: "",
        creditsNumber: "",
        userName: "",
        moduleName: "",

        free: false,
        added: false
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getUserInfo();
      this.getModuleInfo();
    },

    methods: {
      learnClick: function () {

      },
      writeClick: function () {

      },
      testClick: function () {

      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      getModuleInfo: function () {
        console.log('module');
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

  .header-user img{
    margin: 8px auto;
    width: 55px;
    height: 55px;
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

  .carousel-wrapper {
    margin: 20px auto;
  }

  .card-title {
    font-size: 25px;
    font-weight: 600;
    color: #0b486d;
  }

  .card-num {
    position: relative;
    top: 25px;
    color: #0b486d;
    font-size: 13px;
  }

  /*********************************/

  .btn:hover {
    color: white !important;
    background: #f56e72 !important;
    text-decoration: none;
  }

  .settings-form {
    padding: 30px 40px;
    margin-top: 10px;
    margin-bottom: 20px;
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
    margin-top: 7%;
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

  .words-form .word-num{
    color: #12496d;
    padding-right: 0;
    text-align: center;
  }

  .words-form .word{
    text-align: left;
  }

  .words-form .word-def{
    text-align: right;
    padding-right: 50px;
  }

  .settings-form .actions-part {
    background: #eeeeee;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 47px;
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
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 120px;
    height: 30px;
    border-color: white;
    margin: 0 10px;
  }

  .actions-part button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
  }

  .actions-part button:disabled {
    background-color: #f59699 !important;
    cursor: not-allowed;
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
