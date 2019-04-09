<template>
  <div>
    <Header></Header>
    <div class="order-container row">
      <div class="col-sm-6 order-info">
        <h2>Your receipt</h2>
        <div class="credits-info">You are buying <b>{{order.amount}}</b> credits</div>
        <div class="money-info">Total amount: <b>{{order.amount}} {{order.currency}}</b></div>
      </div>
      <div class="col-sm-6 purchase-info">
        <form>
          <div class="form-group">
            <label>Credit Card Info</label>
            <input type="text"
                   class="form-control"
                   placeholder="XXXXXXXXXXXXXXXX"
                   v-model="card.number"
                   required
                   v-mask="'################'">
          </div>
          <div class="form-group">
            <input type="password"
                   class="form-control"
                   placeholder="CVC"
                   v-model="card.cvc"
                   required
                   v-mask="'###'">
          </div>
          <div class="form-group">
            <label>Card Expiration Date</label>
            <input type="text"
                   class="form-control masked"
                   placeholder="MM/YY"
                   v-model="card.exp"
                   required
                   v-mask="'##/##'">
          </div>
          <div class="btn-container">
            <button class="btn btn-primary" @click.prevent="validate" :disabled="stripeCheck">Submit</button>
          </div>
        </form>

        <div v-show="errors">
          <br>
          <ol class="text-danger">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ol>
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
    name: "Order",
    components: {
      Header
    },
    data() {
      return {
        order: {
          amount: '',
          credits: '',
          currency: ''
        },
        card: {
          number: "",
          cvc: "",
          exp: ""
        },
        errors: [],
        stripePublishableKey: 'pk_test_ob6s7KZxZU1mouJbbsuFBjEe',
        stripeCheck: false,
        config: null
      }
    },
    beforeCreate() {
      this.config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.$cookies.get('user_session')
        }
      };
    },
    created() {
      this.getOrderInfo()
    },
    methods: {
      getOrderInfo: function () {
        axios.post('https://memeseeds.herokuapp.com/purchase/option', {purchaseId: this.$route.params.id}, this.config)
          .then(response => {
            this.order.credits = response.data.credits;
            this.order.amount = response.data.price.amount;
            this.order.currency = response.data.price.currency;
          })
          .catch((error) => {
            console.error(error);
          });
      },

      validate: function () {
        this.errors = [];
        let valid = true;
        if (!this.card.number) {
          valid = false;
          this.errors.push('Card Number is required');
        }
        if (!this.card.cvc) {
          valid = false;
          this.errors.push('CVC is required');
        }
        if (!this.card.exp) {
          valid = false;
          this.errors.push('Expiration date is required');
        }
        if (valid) {
          this.createToken();
        }
      },

      createToken: function () {
        this.stripeCheck = true;
        window.Stripe.setPublishableKey(this.stripePublishableKey);
        window.Stripe.createToken(this.card, (status, response) => {
          if (response.error) {
            this.stripeCheck = false;
            this.errors.push(response.error.message);
            console.error(response);
          } else {
            const payload = {
              purchaseId: this.$route.params.id,
              email: this.$cookies.get('userMail'),
              sourceToken: response.id,
              userId: this.$cookies.get('userId')
            };
            const path = 'https://memeseeds.herokuapp.com/purchase/checkout';
            axios.post(path, payload, this.config)
              .then(response => {
                if (response.data.charge.paid) {
                  this.$cookies.set('userCredits', response.data.updatedUserCredits);
                  this.$swal({
                    title: 'Payment successful',
                    text: 'You have purchased ' + this.order.credits + ' credits!',
                    showCancelButton: false
                  }).then((value) => {
                    if (value.value) {
                      router.push('../allModules');
                    }
                  })
                } else {
                  this.$swal({
                    title: 'Payment failed',
                    text: 'An error occurred during payment. Please, try again.',
                    showCancelButton: false
                  }).then((value) => {
                    if (value.value) {
                      router.push('../buyCredits');
                    }
                  })
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });

      },
    }
  }
</script>

<style scoped>
  .order-container {
    width: 100%;
    margin: auto;
    margin-top: 7%;
    padding: 0 100px;
  }

  .order-info {
    color: #12496d;
  }

  .order-info h2 {
    margin-bottom: 20px;
    font-size: 35px;
  }

  .order-info .credits-info {
    margin-bottom: 25px;
    font-size: 19px;
  }

  .order-info .money-info {
    font-size: 19px;
  }

  .purchase-info .btn-container {
    text-align: center;
  }

  .purchase-info .btn-container button {
    background-color: #12496d;
    color: white;
    border-color: white;
    width: 150px;
    border-radius: 20px;
    font-size: 17px;
    height: 35px;
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
