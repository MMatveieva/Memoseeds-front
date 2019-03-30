<template>
  <div>
    <div class="card-header header">
      <div class="row">
        <div class="col-sm-1 logo">
          <img src="../css/images/logo.png">
        </div>
        <div class="col-sm-3 header-search input-group">
          <input type="text" class="form-control" placeholder="Search">
          <div class="input-group-append search-btn">
            <a href="#">
              <img src="../css/images/search.png">
            </a>
          </div>
        </div>
        <div class="col-sm-5 header-text">
          MEMOSEEDS
        </div>
        <div class="col-sm-3 header-user">
          <div class="row">
            <div class="col-sm-6">
              <router-link to="/newModule">
                <img src="../css/images/add-button.png">
              </router-link>
            </div>
            <div class="user-acc col-sm-6">
              <b-dropdown class="user-name" offset="-16">
                <template slot="button-content">{{userName}} user-acc</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/myModules">My modules</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/signIn" v-on:click="logOut" >Log out</router-link>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="buy-credits-container">

      <div class="credits-info row">
        <div class="col-sm-4 info-part">
          <h2 class="credits-title">Credits</h2>
          <div class="credits-number">
            <label id="userCredits">{{userCredits}} 100</label>
          </div>
        </div>
        <div class="col-sm-8 advice-part">
          Use your credit card to get more credits
        </div>
      </div>

      <div class="choose-title">Choose the option</div>

      <div class="buy-option row">
        <div class="col-sm-1 coin-img">
          <img src="../css/images/coin.png">
        </div>
        <div class="col-sm-9 buy-info">
          <div class="row">
            <div class="col-sm-6 buy-number">10 credits</div>
            <div class="col-sm-6 buy-sum">0.99 $</div>
          </div>
        </div>
        <div class="col-sm-2 btn-wrapper">
          <button type="submit" class="btn buy-btn" v-on:click="buyClick">BUY</button>
        </div>
      </div>

      <div class="buy-option row">
        <div class="col-sm-1 coin-img">
          <img src="../css/images/coin2.png">
        </div>
        <div class="col-sm-9 buy-info">
          <div class="row">
            <div class="col-sm-6 buy-number">20 credits</div>
            <div class="col-sm-6 buy-sum">1.99 $</div>
          </div>
        </div>
        <div class="col-sm-2 btn-wrapper">
          <button type="submit" class="btn buy-btn" v-on:click="buyClick">BUY</button>
        </div>
      </div>

      <div class="buy-option row">
        <div class="col-sm-1 coin-img">
          <img src="../css/images/coin3.png">
        </div>
        <div class="col-sm-9 buy-info">
          <div class="row">
            <div class="col-sm-6 buy-number">30 credits</div>
            <div class="col-sm-6 buy-sum">3.99 $</div>
          </div>
        </div>
        <div class="col-sm-2 btn-wrapper">
          <button type="submit" class="btn buy-btn" v-on:click="buyClick">BUY</button>
        </div>
      </div>

      <div class="buy-option row">
        <div class="col-sm-1 coin-img">
          <img src="../css/images/coin4.png">
        </div>
        <div class="col-sm-9 buy-info">
          <div class="row">
            <div class="col-sm-6 buy-number">40 credits</div>
            <div class="col-sm-6 buy-sum">0.99 $</div>
          </div>
        </div>
        <div class="col-sm-2 btn-wrapper">
          <button type="submit" class="btn buy-btn" v-on:click="buyClick">BUY</button>
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

  export default {
    name: "BuyCredits",
    data() {
      return {
        userName: "",
        userCredits: "",
        currency: ""
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';

      //let cur = this.$cookies.get('country');
      let cur = "USA";

      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      axios.post('https://memeseeds.herokuapp.com/purchase/options', {"country": cur}, config)
        .then(response => {
          console.log(response.data);
          //this.currency = response.data.currency;  // not sure about the field
        })
        .catch(error => {
          console.log(error)
        });

    },
    created: function () {
      // this.getCurrency();
      this.getUserInfo();
    },

    methods: {
      logOut:function(){},

      buyClick: function () {
      },

      getCurrency: function () {

      },

      getUserInfo: function () {
        this.userCredits = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      }
      
    }
  }
</script>

<style scoped>
  .credits-info {
    width: 100%;
    padding: 30px 40px;
    margin: 0;
  }

  .info-part {
    background: #acd8c7;
    width: 20%;
    color: #ffffff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    text-align: center;
    align-content: center;
  }

  .credits-info .credits-title {
    margin-top: 7%;
    margin-bottom: 0;
    font-size: 1.7rem;
  }

  .credits-info .credits-number {
    color: #0b486d;
  }

  .credits-info .advice-part {
    color: #f5979a;
    text-align: right;
    background-color: #ffffff;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    padding-top: 30px;
  }

  .choose-title {
    width: 100%;
    padding-left: 10%;
    text-align: left;
    color: #2095a6;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .buy-option {
    padding: 10px 100px;
    text-align: center;
    width: 100%;
  }

  .coin-img img {
    width: 35px;
    height: 35px;
  }

  .buy-option .buy-info {
    padding: 0 10px;
    background-color: white;
    color: black;
    margin: auto 25px;
    flex: 0 0 60%;
  }

  .buy-info .buy-number {
    text-align: left;
    padding-left: 30px;
  }

  .buy-info .buy-sum {
    text-align: right;
    padding-right: 30px;
  }

  .buy-option .btn-wrapper {
    margin: auto;
  }

  .buy-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 130px;
    height: 27px;
    border-color: white;
    margin-left: -40px;
  }

  .btn-wrapper button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
    color: white;
  }


  /*********************************/

  .header {
    background-color: #12496d;
    padding-top: 0;
    padding-bottom: 0;
  }

  .logo img {
    height: 70px;
    width: 70px;
  }

  .header-text {
    text-align: center;
    margin: auto;
    color: white;
    font-weight: 600;
    font-size: 30px;
    letter-spacing: 5px;
  }

  .header-user {
    padding-left: 0;
  }

  .header-user img{
    margin: 8px auto;
    width: 55px;
    height: 55px;
  }

  .header-user .user-photo-header {
    margin: 5px auto;
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
  }

  .header-search {
    margin: auto;
    margin-left: 10px;
  }

  .header-search input {
    border: none;
  }

  .header-search .search-btn {
    background-color: #ffffff;
    line-height: 30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .header-search .search-btn a {
    padding: 4px;
  }

  .header-search .search-btn img {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-left: 3px;
    margin-right: 3px;
  }

  .header-text {
    margin-left: -10px;
  }

  .header-user .user-acc {
    margin: auto;
    color: white;
    margin-left: -18px;
    padding-left: 3px;
  }

  .user-acc .user-name {
    background-color: transparent !important;
    border: none;
    color: white;
    margin-top: 10px;
  }

  .user-acc .user-dropdown {
    color: #0b486d !important;
  }

  .user-name button {
    background-color: transparent;
    border: none;
    color: #ffffff;
  }

  .user-name a {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name a:hover {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name button:hover {
    background-color: transparent !important;
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }

  .user-name > button :active, .user-name > button :focus {
    background-color: transparent !important;
    text-decoration: underline;
    color: white;
  }

  .user-name > .btn {
    background-color: transparent !important;
    color: white !important;
  }

  .user-name > .dropdown-menu {
    min-width: 7rem;
  }

  .btn-secondary {
    background-color: transparent !important;
    border: none !important;
  }

  /*************************************/

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
