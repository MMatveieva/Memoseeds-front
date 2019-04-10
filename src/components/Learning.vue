<template>
  <div>
    <Header></Header>
    <div class="module-container">
      <div class="settings-form">
        <div class="row" style="width: 100%; margin: 0">
          <div class="col-sm-4 info-part">
            <h2 class="modules-title">{{moduleName}}</h2>
            <div class="modules-info">
              <p>Number of words:</p>
              <label id="modules1">{{wordsAll}}</label>
            </div>
            <h2 class="modules-title">Learning</h2>
            <div class="modules-info">
              <button type="button" class="back-btn" v-on:click="backClick">GO BACK</button>
            </div>
          </div>

          <div class="col-sm-8 actions-part">
            <div class="carousel-wrapper">
              <b-carousel
                id="module-carousel"
                controls
                :interval=0
                background="white"
                img-height="65"
                img-width="200">

                <LearnTemplate
                  v-for="wordL in words"
                  v-bind:key="wordL.id"
                  v-bind:wordL="wordL"
                  v-bind:word="wordL.word"
                  v-bind:definition="wordL.definition"
                ></LearnTemplate>

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
  import Header from './Header'
  import LearnTemplate from './LearnTemplate'
  import axios from 'axios'

  export default {
    name: "ModulePage",
    components: {
      Header,
      LearnTemplate
    },
    data() {
      return {
        wordsAll: "",
        moduleName: "",
        words: []
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getWords();
    },

    methods: {
      getWords: function () {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get("userId") + '/modules/' + this.$route.params.id;
        axios.get(pass, config)
          .then(response => {
            if (response.data.error == null) {
              this.moduleName = response.data.module.name;
              let data = response.data.module.terms;
              let w = new Array(data.length);
              for (let i = 0; i < data.length; i++) {
                w[i] = {
                  id: data[i].termId,
                  word: data[i].definition,
                  definition: data[i].name
                };
              }
              this.wordsAll = data.length;
              this.words = w;
              console.log(this.words);
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log(error)
          });
      },

      backClick: function () {
        let p = this.$route.params.id;
        router.push('../myModule/' + p);
      }
    }
  }
</script>

<style>
  .carousel-wrapper {
    width: 100%;
  }

  /***********************************************/

  .settings-form .actions-part {
    background: #ffffff;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 40px;
    padding-bottom: 8px;
    text-align: center;
    flex: 0 0 60%;
  }

  /*********************************/

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

  /********************************/

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e") !important;
  }

  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e") !important;
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
    margin-bottom: 13px;
  }

  /****************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0 !important;
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
