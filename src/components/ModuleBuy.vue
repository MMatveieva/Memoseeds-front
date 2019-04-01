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
    name: "ModuleBuy",
    components: {
      Header
    },
    data() {
      return {
        wordsNumber: "",
        creditsNumber: "",
        userName: "",
        moduleName: "",

        pass: "",

        free: false,
        added: false,
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


      }
    }
  }
</script>

<style scoped>

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
