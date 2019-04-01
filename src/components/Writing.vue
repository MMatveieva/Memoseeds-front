<template>
  <div>
    <Header></Header>

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
            <div class="action-text">
              Your brother's wife{{wordDef}}
            </div>
            <div class="action-input">
              <input type="text" class="ans-input" placeholder="Write your answer here">
            </div>
            <div class="row action-service">
              <div class="col-sm-9 words-num">{{wordNow}}/{{wordsAll}}</div>
              <div class="col-sm-3 btn-container">
                <button type="submit" class="btn next-btn" v-on:click="nextClick">
                  NEXT
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
  import router from '../router';
  import Header from './Header'

  export default {
    name: "ModulePage",
    components: {
      Header
    },
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
      nextClick: function () {

      }

    }
  }
</script>

<style>
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

  .actions-part .action-text {
    margin-top: 7%;
    color: #0b486d;
    font-size: 1.7rem;
    font-weight: 500;
  }

  .actions-part .action-input {
    margin-top: 15%;
  }

  .actions-part .btn-container {
    margin-left: -85px;
  }

  .actions-part .ans-input {
    margin: 15px 0;
    background-color: #f5f5f7;
    color: black;
    height: 30px;
    width: 270px;
    border: none !important;
    text-align: center;
  }

  .actions-part .words-num {
    color: #2095a6;
    font-size: 15px;
    margin-left: 40px;
  }

  .actions-part .action-service {
    margin-top: 30px;
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
    width: 130px;
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
