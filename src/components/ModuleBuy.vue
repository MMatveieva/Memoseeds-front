<template>
  <div>
    <Header></Header>
    <div class="vld-parent">
      <loading :active.sync="isLoading"
               :can-cancel="false"
               :is-full-page="true"
               :color="color">
      </loading>
    </div>

    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-4 info-part">
            <h2 class="modules-title">{{moduleName}}</h2>
            <div class="sub-cat">{{subjectName}}/{{categoryName}}</div>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules">{{wordsNumber}}</label>
            </div>
          </div>
          <div class="col-sm-8 actions-part">
            <button type="submit" class="btn action-btn" disabled="disabled">Learn</button>
            <button type="submit" class="btn action-btn" disabled="disabled">Write</button>
            <button type="submit" class="btn action-btn" disabled="disabled">Test</button>
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
        <button id="buttonBuy" type="button" class="btn add-btn" v-on:click="addClick" v-bind:class="{wide:toBuy}">
          {{addOption}}
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
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: "ModuleBuy",
    components: {
      Header,
      Terms,
      Loading
    },
    data() {
      return {
        wordsNumber: "",
        creditsNumber: "",
        userName: "",
        moduleName: "",
        categoryName: '',
        subjectName: '',
        addOption: "",
        price: '',
        terms: [],

        added: false,
        toBuy: false,

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
      }, 1300);
      
      this.getModuleInfo();
    },

    methods: {
      addClick: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        if (this.price == '0') {
          axios.post('https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/get/module/' + this.$route.params.id,
            {
              "userid": this.$cookies.get("userId"),
              "moduleid": this.$route.params.id
            }, config).then(response => {
            if (response.data.result == 'success') {
              this.$swal({
                title: 'Module added',
                text: 'Start?',
                showCancelButton: true
              }).then((value) => {
                if (value.value == true) {
                  router.push('../myModule/' + response.data.moduleId);
                } else {
                  router.push('../allModules');
                }
              })
            }
          })
            .catch(error => {
              console.log(error);
            });
        }
        if (this.$cookies.get("userCredits") < this.price) {
          this.$swal({
            title: 'You do not have enough credits',
            text: 'Buy credits?',
            showCancelButton: true
          }).then((value) => {
            if (value.value) {
              router.push('../buyCredits');
            }
          })
        } else if (this.price != '0') {
          this.$swal({
            title: 'Purchase confirmation',
            text: 'This module costs ' + this.price + ' credits.',
            showCancelButton: true
          }).then((value) => {
            if (value.value) {
              axios.post('https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/get/module/' + this.$route.params.id,
                {
                  "userid": this.$cookies.get("userId"),
                  "moduleid": this.$route.params.id
                }, config).then(response => {
                console.log(response.data);
                if (response.data.result == 'success') {
                  this.$cookies.set('userCredits', response.data.creditsLeft);
                  this.$swal({
                    title: 'Module added',
                    text: 'Start?',
                    showCancelButton: true
                  }).then((value) => {
                    if (value.value == true) {
                      router.push('../myModule/' + response.data.moduleId);
                    } else {
                      router.push('../allModules');
                    }
                  })
                }
              })
                .catch(error => {
                  console.log(error);

                });
            }
          })
        }
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
        let pass = 'https://memeseeds.herokuapp.com/shop/modules/' + this.$route.params.id;
        axios.get(pass, config)
          .then(response => {
            this.drawTerms(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading terms. Please try again");
          });
      },

      drawTerms: function (data) {
        this.categoryName = data.category;
        this.subjectName = data.subject;
        this.moduleName = data.module.name;

        let mm = new Array(data.module.terms.length);
        this.wordsNumber = data.module.terms.length;

        for (let i = 0; (i < data.module.terms.length && i < 5); i++) {
          let m = {
            word: data.module.terms[i].name,
            definition: data.module.terms[i].definition,
            id: data.module.terms[i].termId,
            pos: i + 1
          };
          mm[i] = m;
        }
        this.terms = mm;
        this.price = data.module.price;
        if (data.module.price == '0') {
          this.addOption = 'ADD';
        } else {
          this.toBuy = true;
          this.addOption = 'BUY FOR ' + data.module.price + ' CREDITS';
        }
      }
    }
  }
</script>

<style scoped>
  .module-container {
    min-height: 438px;
  }

  .btn-container {
    margin: 10px auto;
    margin-bottom: 30px;
    text-align: center;
  }

  .btn-container button:hover {
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

  .info-part .sub-cat{
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
    position: relative;
    width: 100%;
    bottom: 0;
  }

  .wide {
    width: 220px;
  }

</style>
