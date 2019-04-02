<template>
  <div>
    <Header></Header>

    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-3 info-part">
            <h2 class="modules-title">{{moduleName}}</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules1">{{wordsAll}}</label>
            </div>
            <h2 class="modules-title">Testing</h2>
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
              <label id="modules4">{{wordsIncorrect}}</label>
            </div>
          </div>

          <div class="col-sm-9 actions-part">
            <div style="overflow-y: scroll">
              <TestTemplate
                v-for="row in rows"
                v-bind:key="row.rowId"
                v-bind:answer="row.answer"
                v-bind:word="row.word"
                v-bind:definition="row.definition"
              ></TestTemplate>

            </div>


            <div class="action-input" v-bind:class="{hidden: end}">
            </div>
            <div class="action-service btn-container">
              <button type="submit" class="btn check-btn" v-on:click="nextClick">
                CHECK THE MATCH
              </button>
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
  import TestTemplate from './TestTemplate'
  import axios from 'axios'


  export default {
    name: "ModulePage",
    components: {
      Header,
      TestTemplate
    },
    data() {
      return {
        moduleName: "",
        wordsAll: "",
        wordsLeft: "",
        wordsCorrect: "",
        wordsIncorrect: "",

        inputText: "",
        module: [],
        end: false,


        // written by Masha
        rows: []
      }
    },
    beforeCreate: function () {
      document.body.className = 'inside';
    },
    created: function () {
      this.getModuleData();
    },

    methods: {
      nextClick: function () {
        if (!this.end)
          this.check();
        else {
          let id = this.$route.params.id;
          router.push("/");
          router.push('myModule/' + id);
        }

      },

      check() {
        if (this.inputText == this.module[this.wordNow - 1].name)
          this.wordsCorrect += 1;
        else
          this.wordsIncorrect += 1;

        if (this.wordNow != this.wordsAll) {
          this.wordNow += 1;
          this.wordDef = this.module[this.wordNow - 1].definition;
          this.wordsLeft = this.wordsAll - this.wordNow;
        } else {
          this.end = true;
          this.wordDef = "Success! Your score is " + this.wordsCorrect / this.wordsAll + "%!";
        }
        this.inputText = "";
      },
      getModuleData() {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get("userId") + '/modules/' + this.$route.params.id;
        axios.get(pass, config)
          .then(response => {
            if (response.data.error == null) {
              this.module = response.data.terms;
              this.moduleName = response.data.name;
              this.init()
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log(error)
          });
      },
      init() {
        this.wordNow = 1;
        this.wordsAll = this.module.length;
        this.wordsLeft = this.wordsAll - this.wordNow;
        console.log(this.module[this.wordNow - 1]);

        this.wordDef = this.module[this.wordNow - 1].definition;
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

  .actions-part .action-input {
    margin-top: 15%;
  }

  .actions-part .btn-container {
    margin-left: -85px;
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

  .actions-part .check-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    width: 210px;
    height: 30px;
    border-color: white;
    margin: 0;
    padding-top: 5px;
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
