<template>
  <div>
    <Header></Header>


    <div class="recent-wrapper">

      <div class="module-container">
        <div class="settings-form">
          <div class="row">
            <div class="col-sm-3 info-part">
              <h2 class="modules-title">Family</h2>
              <div class="modules-info">
                <p>Number of words:</p>
                <label id="module">{{wordsNumber[0]}}</label>
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

    <div class="go-to-shop">
      <button type="button" class="go-btn">
        <router-link to="/allModules">GO TO ALL MODULES</router-link>
      </button>
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
    name: "Recent",
    components: {
      Header
    },
    data() {
      return {
        userName: "",
        wordsNumber: []
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getUserInfo();
      this.getUserModules();
    },

    methods: {
      getUserInfo: function () {
        this.userName = this.$cookies.get('userName');
      },

      getUserModules: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules';
        axios.get(pass, config)
          .then(response => {
            console.log(response.data);
            this.drawModules(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      drawModules: function (data) {

      },

      startClick: function () {
      }
    }
  }
</script>

<style scoped>
   /*************************************/

  .recent-wrapper {
    margin-top: 20px;
  }

  .actions-part .action-text {
    margin: auto;
  }

  .actions-part .btn-container {
    margin: auto;
  }

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

  .action-btn a:hover {
    color: white;
    text-decoration: none;
  }

  .actions-part button:hover {
    background-color: #186e7a !important;
    cursor: pointer;
  }

  /*************************************/

  .go-to-shop {
    margin-top: 10px;
    padding: 10px 40px;
    text-align: right;
  }

  .go-to-shop .go-btn {
    background-color: #0b486d;
    color: white;
    width: 210px;
    border-radius: 20px;
    font-size: 14px;
    height: 35px;
    border-color: white;
    padding-top: 4px;
  }

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

</style>
