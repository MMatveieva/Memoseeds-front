<template>
  <div>
    <Header></Header>

    <div class="buy-credits-container">

      <div class="credits-info">
        <div class="row">
          <div class="col-sm-4 info-part">
            <h2 class="credits-title">Credits</h2>
            <div class="credits-number">
              <label id="userCredits">{{userCredits}}</label>
            </div>
          </div>
          <div class="col-sm-8 advice-part">
            Use your credit card to get more credits
          </div>
        </div>

        <div class="choose-title">Choose the option</div>

        <div class="buy-option">
          <div class="row">
            <div class="col-sm-1 coin-img">
              <img src="../css/images/coin.png">
            </div>
            <div class="col-sm-9 buy-info">
              <div class="row">
                <div class="col-sm-6 buy-number">{{credits[0]}} credits</div>
                <div class="col-sm-6 buy-sum">{{price[0]}} {{currencySymbol}}</div>
              </div>
            </div>
            <div class="col-sm-2 btn-wrapper">
              <button id="0" type="submit" class="btn buy-btn" v-on:click="buyClick($event)">BUY</button>
            </div>
          </div>
        </div>

        <div class="buy-option">
          <div class="row">
            <div class="col-sm-1 coin-img">
              <img src="../css/images/coin2.png">
            </div>
            <div class="col-sm-9 buy-info">
              <div class="row">
                <div class="col-sm-6 buy-number">{{credits[1]}} credits</div>
                <div class="col-sm-6 buy-sum">{{price[1]}} {{currencySymbol}}</div>
              </div>
            </div>
            <div class="col-sm-2 btn-wrapper">
              <button id="1" type="submit" class="btn buy-btn" v-on:click="buyClick($event)">BUY</button>
            </div>
          </div>
        </div>

        <div class="buy-option">
          <div class="row">
            <div class="col-sm-1 coin-img">
              <img src="../css/images/coin3.png">
            </div>
            <div class="col-sm-9 buy-info">
              <div class="row">
                <div class="col-sm-6 buy-number">{{credits[2]}} credits</div>
                <div class="col-sm-6 buy-sum">{{price[2]}} {{currencySymbol}}</div>
              </div>
            </div>
            <div class="col-sm-2 btn-wrapper">
              <button id="2" type="submit" class="btn buy-btn" v-on:click="buyClick($event)">BUY</button>
            </div>
          </div>
        </div>

        <div class="buy-option">
          <div class="row">
            <div class="col-sm-1 coin-img">
              <img src="../css/images/coin4.png">
            </div>
            <div class="col-sm-9 buy-info">
              <div class="row">
                <div class="col-sm-6 buy-number">{{credits[3]}} credits</div>
                <div class="col-sm-6 buy-sum">{{price[3]}} {{currencySymbol}}</div>
              </div>
            </div>
            <div class="col-sm-2 btn-wrapper">
              <button id="3" type="submit" class="btn buy-btn" v-on:click="buyClick($event)">BUY</button>
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
    name: "BuyCredits",
    components: {
      Header
    },
    data() {
      return {
        userName: "",
        userCredits: "",
        price: [],
        credits: [],
        purchaseId: [],
        currency: "",
        currencySymbol: "",

        tokenFromPromise: {},
        tokenFromEvent: {},
        image: 'https://i.imgur.com/HhqxVCW.jpg',
        name: 'Shut up and take my money!',
        description: 'Cats are the best dog!',
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';

      let cur = this.$cookies.get('country');
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.$cookies.get('user_session')
        }
      };
      axios.post('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/purchase/options', {"country": cur}, config)
        .then(response => {
          let p = new Array(response.data.purchases.length);
          response.data.purchases.sort(function (a, b) {
            return a.credits - b.credits;
          });
          for (let i = 0; i < response.data.purchases.length; i++) {
            p[i] = response.data.purchases[i].price.amount;
            this.purchaseId.push(response.data.purchases[i].id);
            this.credits.push(response.data.purchases[i].credits);
          }
          this.currency = response.data.purchases[0].price.currency;
          this.currencySymbol = this.currency;
          this.price = p;
        })
        .catch(error => {
          console.log(error);
          alert("Error occurred during operation. Please try again");
        });

    },
    created: function () {
      this.getUserInfo();
    },

    methods: {
      buyClick: function (event) {
        let targetId = event.currentTarget.id;
        let id = this.purchaseId[targetId];
        router.push('/');
        router.push('/order/' + id);
      },

      getUserInfo: function () {
        this.userCredits = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      }
    }
  }
</script>

<style scoped>
  .row {
    width: 100%;
    margin: 0;
  }

  .credits-info {
    padding: 30px 40px;
  }

  .info-part {
    background: #acd8c7;
    width: 20%;
    color: #ffffff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    text-align: center;
    align-content: center;
    box-sizing: border-box
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
    box-sizing: border-box
  }

  .choose-title {
    width: 100%;
    padding-left: 10%;
    text-align: left;
    color: #2095a6;
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 30px;
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
