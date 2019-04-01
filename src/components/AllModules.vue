<template>
  <div>
    <Header></Header>
    <div class="shop-wrapper">

      <div class="module-container">
        <div class="settings-form">
          <div class="row">
            <div class="col-sm-3 info-part">
              <h2 class="modules-title">Transport</h2>
              <div class="modules-info">
                <p>Number of words:</p>
                <label id="modules1">{{wordsNumber}}</label>
              </div>
            </div>

            <div class="col-sm-9 actions-part">
              <div class="row">
                <div class="col-sm-8 action-text">
                  Car, tram, vehicle, airplane railway station, petrol
                </div>
                <div class="col-sm-4 btn-container">
                  <button type="submit" class="btn action-btn" v-on:click="startClick">
                    <router-link to="/module">START</router-link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="module-container">
        <div class="settings-form">
          <div class="row">
            <div class="col-sm-3 info-part">
              <h2 class="modules-title">Wildlife</h2>
              <div class="modules-info">
                <p>Number of words:</p>
                <label id="modules2">{{wordsNumber}}</label>
              </div>
            </div>

            <div class="col-sm-9 actions-part">
              <div class="row">
                <div class="col-sm-8 action-text">
                  Species, habitat, ecosystem, recreation, forest
                </div>
                <div class="col-sm-4 btn-container">
                  <button type="submit" class="btn action-btn" v-on:click="startClick">
                    <router-link to="/module">START</router-link>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="module-container">
        <div class="settings-form">
          <div class="row">
            <div class="col-sm-3 info-part">
              <h2 class="modules-title">Family</h2>
              <div class="modules-info">
                <p>Number of words:</p>
                <label id="modules3">{{wordsNumber}}</label>
              </div>
            </div>

            <div class="col-sm-9 actions-part">
              <div class="row">
                <div class="col-sm-8 action-text">
                  Marriage, household, vehicle, airplane railway station
                </div>
                <div class="col-sm-4 btn-container">
                  <button type="submit" class="btn action-btn" v-on:click="startClick">
                    <router-link to="/module">START</router-link>
                  </button>
                </div>
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
  import axios from 'axios'
  import router from '../router'
  import Header from './Header'

  export default {
    name: "ModulePage",
    components: {
      Header
    },
    data() {
      return {
        wordsNumber: 0,
        creditsNumber: 0
      }
    },
    created: function () {
      this.getAllModules();
    },
    methods: {
      getAllModules: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };

        axios.get('https://memeseeds.herokuapp.com/shop/subjects/categories/modules', config)
          .then(response => {
            console.log(response.data);

          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });

      },

      startClick: function () {

      }
    }
  }
</script>

<style scoped>
  /***********************************************/

  .actions-part .action-text {
    margin: auto;
  }

  .actions-part .btn-container {
    margin: auto;
  }

  /*********************************/

  .btn:hover {
    color: white !important;
    background: #12587c !important;
    text-decoration: none;
    cursor: pointer;
  }

  .settings-form {
    padding: 10px 40px;
  }

  .settings-form .row {
    width: 100%;
    margin: 0;
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

  .modules-title {
    margin-top: 7%;
    font-size: 1.7rem;
  }

  .modules-info {
    font-size: 100%;
    color: #12496d;
  }

  .modules-info label {
    margin-bottom: 0.1rem;
  }

  .settings-form .actions-part {
    background: #eeeeee;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 30px;
    padding-bottom: 0;
    text-align: center;
    flex: 0 0 70%;
  }

  .actions-part .action-btn {
    background-color: #2095a6 !important;
    border-radius: 20px;
    font-size: 15px;
    color: white;
    width: 120px;
    height: 30px;
    border-color: white;
    margin: 0;
  }

  .action-btn a {
    color: white;
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
