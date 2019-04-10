<template>
  <div>
    <div class="page-wrapper">
      <div class="page-con">
        <Header></Header>

        <div class="vld-parent">
          <loading :active.sync="isLoading"
                   :can-cancel="false"
                   :is-full-page="true"
                   :color="color">
          </loading>
        </div>

        <div class="module-container">
          <div class="settings-form row">
            <div class="col-sm-4 info-part">
              <h2 class="modules-title">{{moduleName}}</h2>
              <div class="sub-cat">{{subjectName}}/{{categoryName}}</div>
              <div class="modules-info">
                <p>Number of words:</p>
                <label id="modules">{{wordsNumber}}</label>
              </div>
            </div>
            <div class="col-sm-8 actions-part">
              <button type="submit" class="btn action-btn" v-on:click="learnClick" v-bind:disabled=!added>Learn</button>
              <button type="submit" class="btn action-btn" v-on:click="writeClick" v-bind:disabled=!added>Write</button>
              <button type="submit" class="btn action-btn" v-on:click="testClick" v-bind:disabled=!added>Test</button>
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

          <div class="btn-part row">
            <div class="btn-container-edit col-sm-6">
              <button type="button" class="btn edit-btn" v-on:click="editClick">
                EDIT
              </button>
            </div>
            <div class="btn-container col-sm-6">
              <button type="button" class="btn add-btn" v-on:click="deleteClick">
                DELETE
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="card-footer footer">
        MEMOSEEDS INC., ALL RIGHTS RESERVED
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  import axios from 'axios'
  import Header from './Header'
  import Terms from './Terms'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: "ModulePage",
    components: {
      Header,
      Terms,
      Loading
    },
    data() {
      return {
        wordsNumber: "",
        creditsNumber: "",
        moduleName: "",

        terms: [],
        subjectName: '',
        categoryName: '',

        added: false,
        isLoading: false,
        color: "#12496d"
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 1000);

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('user_session')
        }
      };
      axios.post('https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/has/module/'
        + this.$route.params.id, {
        "userid": this.$cookies.get("userId"),
        "moduleid": this.$route.params.id
      }, config)
        .then(response => {
          this.added = response.data.result;
          if (this.added)
            this.getModuleInfo();
        })
        .catch(error => {
          console.log(error);
          alert("Error occurred during loading modules. Please try again");
        });
    },

    methods: {
      editClick: function () {
        let p = this.$route.params.id;
        router.push('../editModule/' + p);
      },

      deleteClick: function () {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/delete/modules/' +
          this.$route.params.id;
        axios.post(pass, {}, config)
          .then(response => {
            console.log(response.data);
            this.$swal({
              title: response.data.result,
              showCancelButton: false
            }).then((value) => {
              if (value.value) {
                router.push('../recent');
              }
            })
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      learnClick: function () {
        let p = this.$route.params.id;
        router.push('../learn/' + p);
      },
      writeClick: function () {
        let p = this.$route.params.id;
        router.push('../write/' + p);
      },
      testClick: function () {
        let p = this.$route.params.id;
        router.push('../test/' + p);
      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      getModuleInfo: function () {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules/' +
          this.$route.params.id;
        axios.get(pass, config)
          .then(response => {
            this.drawTerms(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });

      },

      drawTerms: function (data) {
        this.categoryName = data.category;
        this.subjectName = data.subject;
        this.moduleName = data.module.name;
        let mm = new Array(data.module.terms.length);
        this.wordsNumber = data.module.terms.length;

        for (let i = 0; i < data.module.terms.length; i++) {
          let m = {
            word: data.module.terms[i].name,
            definition: data.module.terms[i].definition,
            id: data.module.terms[i].termId,
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
  .page-wrapper {
    position: relative;
    min-height: 100vh;
  }

  .page-con{
    padding-bottom: 45px;
  }

  .module-container {
    /*min-height: 453px;*/
  }

  .btn-container, .btn-container-edit {
    margin: 10px auto;
    text-align: center;
  }

  .btn-container button:hover {
    background-color: #12496d !important;
  }

  .btn-container-edit button:hover {
    background-color: #acd8c7 !important;
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

  .edit-btn {
    background-color: #acd8c7 !important;
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
    width: 100%;
    margin: 10px 0 20px 0;
  }

  .info-part {
    background: #acd8c7;
    color: #ffffff;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-align: center;
  }

  .info-part p {
    margin-bottom: 0;
  }

  .info-part .sub-cat {
    font-size: 13px;
    margin-bottom: 5px;
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
    padding-top: 54px;
    padding-bottom: 40px;
    text-align: center;
    flex: 0 0 60%;
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

  .btn-part {
    width: 100%;
    margin-bottom: 15px;
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
    height: 50px;
  }

  .hidden {
    display: none;
  }

</style>
