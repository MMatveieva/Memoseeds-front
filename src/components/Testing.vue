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
              <button type="button" class="back-btn" v-on:click="backClick">GO BACK</button>
            </div>
          </div>

          <div class="col-sm-9 actions-part">
            <div class="action-text">
              {{wordDef}}
            </div>
            <div style="overflow-y: scroll" v-bind:class="{hidden:end}">
              <form v-on:keyup="keyUp" >
                <TestTemplate
                  v-for="row in rows"
                  v-bind:key="row.rowId"
                  v-bind:answer="row.answer"
                  v-bind:word="row.word"
                  v-bind:row-id="row.rowId"
                  v-bind:definition="row.definition"
                ></TestTemplate>
              </form>


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
    name: "Testing",
    components: {
      Header,
      TestTemplate
    },
    data() {
      return {
        moduleName: "",
        wordsAll: 0,
        wordsLeft: "",
        wordsCorrect: "",
        wordsIncorrect: "",

        inputText: "",
        module: [],
        terms:[],

        // written by Masha
        rows: [],
        answers: new Array(this.wordsAll),
        end : false,
        wordDef : ""
      }
    },
    beforeCreate: function () {
      document.body.className = 'inside';
    },
    created: function () {
      this.getModuleData();
      this.$cookies.remove('answer')
    },

    methods: {
      keyUp: function () {
        // this.answers.push(this.$cookies.get('answer'));
        // console.log(this.$cookies.get('answer'));
        // console.log(this.$cookies.get("id"));

        this.answers[this.$cookies.get('id')] = this.$cookies.get('answer');

      },
      backClick: function () {
        let p = this.$route.params.id;
        router.push('/');
        router.push('myModule/' + p);
      },

      nextClick: function () {

        if(!this.end) {
          var countSucs = 0;
          var terms = this.terms;
          var rows = this.rows
          this.answers.forEach(function (item, i) {
            if (terms[item].definition == rows[i].definition)
              countSucs++;
          });
          this.end = true;
          var res = (countSucs / this.wordsAll) * 100;
          this.wordDef = "Your score is " + res.toPrecision(3) + "%!";

        }
        else{
          let id = this.$route.params.id;
          router.push("/");
          router.push('myModule/' + id);
        }




      },

      getModuleData: function () {
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
              this.wordsAll = response.data.terms.length;
              this.moduleName = response.data.name;
              this.init();

            } else {
              // console.log(response);
            }
          })
          .catch(error => {
            console.log(error)
          });
        // console.log(this.module);
      },

      init: function () {
        var answers = [];
        var c = [];
        var definitions = [];
        this.module.forEach(function (item) {
          answers.push(item.name);
          c.push(item);
        });
        this.terms = c;
        // console.log(this.module);
        this.module.forEach(function (item) {
          definitions.push(item.definition);
        });

        definitions = this.shuffle(definitions);
        var res = [];
        answers.forEach(function (item, i) {
          res.push({
            rowId: i,
            answer: "",
            word: item,
            definition: definitions[i]
          });
        });
        this.rows = res;
      },

      shuffle: function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
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

  .modules-info a {
    color: white;
    text-decoration: none;
  }

  .modules-info .back-btn {
    background-color: #0b486d;
    color: white;
    width: 150px;
    border-radius: 20px;
    font-size: 14px;
    height: 35px;
    border-color: white;
    padding-top: 4px;
    margin-top: 20px;
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
