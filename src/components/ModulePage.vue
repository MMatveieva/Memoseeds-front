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
              <label id="modules">{{wordsNumber}}</label>
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
      <div class="words-wrapper">

        <Terms
          v-for="term in this.terms"
          v-bind:key="term.id"
          v-bind:word="term.word"
          v-bind:definition="term.definition"
          v-bind:id="term.id"
          v-bind:pos="term.pos">
        </Terms>
      </div>

      <div class="btn-container">
        <button type="button" class="btn add-btn" v-on:click="editClick">
          EDIT
        </button>
      </div>

    </div>

    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  import router from '../router'
  import axios from 'axios'
  import Header from './Header'
  import Terms from './Terms'

  export default {
    name: "ModulePage",
    components: {
      Header,
      Terms
    },
    data() {
      return {
        wordsNumber: "",
        creditsNumber: "",
        moduleName: "",

        terms: [],

        added: false

      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getModuleInfo();

      // router.afterEach((to, from) => {
      //   this.$cookies.set('from', from.fullPath);
      // });
    },

    methods: {
      editClick: function () {
      },

      learnClick: function () {
        router.push('/');
        router.replace({path: './learn'});
      },
      writeClick: function () {
        router.push('/');
        router.replace('write');
      },
      testClick: function () {
        router.push('/');
        router.replace('test');
      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      getModuleInfo: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules/' +
          this.$route.params.id;

        axios.get(pass, config)
          .then(response => {
            this.moduleName = response.data.name;
            // console.log('user ', response.data.userId);
            if (this.$cookies.get('userId') == response.data.userId)
              this.added = true;
            this.drawTerms(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });

      },

      drawTerms: function (data) {
        let mm = new Array(data.terms.length);
        this.wordsNumber = data.terms.length;

        for (let i = 0; i < data.terms.length; i++) {
          let m = {
            word: data.terms[i].name,
            definition: data.terms[i].definition,
            id: data.terms[i].termId,
            pos: i + 1
          };
          mm[i] = m;
        }
        this.terms = mm;
      }
    }
  }
</script>

<style scoped>
  .btn-container {
    margin: 10px auto;
    text-align: center;
  }

  .btn-container button:hover{
    background-color: #12496d !important;
  }

  .add-btn {
    background-color: #12496d !important;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    width: 150px;
    height: 35px;
    border-color: white;
    margin: 0;
    padding-top: 6px;
  }

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

  .settings-form .actions-part {
    background: #eeeeee;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 47px;
    padding-bottom: 40px;
    text-align: center;
    flex: 0 0 70%;
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

  .words-wrapper {
    margin-top: 15px;
    margin-bottom: 25px;
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
