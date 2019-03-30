<template>
  <div class="signUp">
    <div class="logo">
      <img src="../css/images/logo.png">
    </div>
    <div class="signUp-form row">
      <div class="col-sm-5 signIn-prop">
        <div class="signIn-prop-inside">
          <h4>Welcome Back!</h4>
          <p>To start using Memoseeds please sign in to your account</p>
          <router-link to="/signIn">
            <div class="router-button">
              <button type="button" class="btn signIn-btn">SIGN IN</button>
            </div>
          </router-link>
        </div>
        <div class="faq">
          <a href="#">HOW IT WORKS?</a>
        </div>
      </div>
      <div class="col-sm-7 signUp-prop">
        <h4>CREATE ACCOUNT</h4>
        <form>
          <div class="form-group signUp-group">
            <input type="text" class="form-control" id="signUp-name"
                   placeholder="Name" v-model="name_signUp" required v-on:keyup="nameEdit"
                   v-bind:class="{not_ok: noNameOk}">
            <small id="nameError" class="form-text text-muted" v-bind:class="{hidden: noName}">Please enter
              name.
            </small>
            <small id="nameError1" class="form-text text-muted" v-bind:class="{hidden: noNameOk}">Please
              enter name without numbers.
            </small>
            <input type="email"
                   class="form-control" id="signUp-email"
                   placeholder="Email" v-model="email" required v-on:keyup="emailEdit">
            <small id="emailError" class="form-text text-muted" v-bind:class="{hidden: noEmail}">Please enter
              e-mail.
            </small>
            <!--<input type="text" class="form-control" id="signUp-phone"-->
                   <!--placeholder="Phone number" v-model="phone" required v-on:keyup="phoneEdit"-->
                   <!--v-bind:class="{not_ok: noPhoneOk}">-->
            <!--<small id="phoneError" class="form-text text-muted" v-bind:class="{hidden: noPhone}">Please enter-->
              <!--phone number.-->
            <!--</small>-->
            <!--<small id="phoneError1" class="form-text text-muted" v-bind:class="{hidden: noPhoneOk}">Please enter-->
              <!--phone number correctly.-->
            <!--</small>-->
            <input type="password" class="form-control" id="signUp-password"
                   placeholder="Password" v-model="password" required v-on:keyup="passwordEdit">
            <small id="passwordError1" class="form-text text-muted" v-bind:class="{hidden: noPass}">Please enter
              password.
            </small>
            <input type="password" class="form-control" id="signUp-rep-password"
                   placeholder="Repeat password" v-model="password_confirmation" required
                   v-on:keyup="passwordConfirmEdit">
            <small id="passwordMissing" class="form-text text-muted" v-bind:class="{hidden: noPassRep}">Please
              repeat password.
            </small>

            <small id="passwordError" class="form-text text-muted" v-bind:class="{hidden: noPassMatch}">Repeated
              password doesn`t match password.
            </small>
          </div>
          <button id="signUp-btn" type="button" class="btn signUp-btn" v-on:click="btnClick">SIGN UP</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {router} from '../router';

  export default {
    name: 'SignUp',
    data() {
      return {
        name_signUp: "",
        email: "",
        // phone: "",
        password: "",
        password_confirmation: "",

        noNameOk: true,
        noName: true,
        noEmail: true,
        // noPhoneOk: true,
        // noPhone: true,
        noPass: true,
        noPassRep: true,
        noPassMatch: true
      }
    },
    beforeCreate: function() {
      document.body.className = 'home';
    },

    methods: {
      nameEdit: function () {
        this.noName = true;
        this.noNameOk = true;
        console.log("NAME");
      },
      emailEdit: function () {
        this.noEmail = true;
      },
      phoneEdit: function () {
        this.noPhone = true;
        this.noPhoneOk = true;
      },
      passwordEdit: function () {
        this.noPass = true;
      },
      passwordConfirmEdit: function () {
        this.noPassRep = true;
        this.noPassMatch = true;
      },
      checkName: function (data) {
        let nameReg = /^[a-zA-Z-а-яА-Яії'є\s]*$/;
        if (nameReg.test(data))
          this.noNameOk = true;
      },
      checkPhone: function (data) {
        let phoneReg = /^[0-9+]/;
        if (phoneReg.test(data))
          this.noPhoneOk = true;
      },
      btnClick: function () {
        if (this.name_signUp == "")
          this.noName = false;
        if (this.email == "")
          this.noEmail = false;
        if (this.phone == "")
          this.noPhone = false;
        if (this.password == "")
          this.noPass = false;
        if (this.password_confirmation == "")
          this.noPassRep = false;
        if ((this.name_signUp !== "") && (this.email !== "") &&
          // (this.phone !== "") &&
          (this.password !== "") &&
          (this.password_confirmation !== "")) {
          console.log("have all comp");
          this.noNameOk = false;
          this.noPhoneOk = false;
          console.log("CLICK");
          this.checkName(this.name_signUp);
          this.checkPhone(this.phone);
          if ((this.noNameOk == true)
            // && (this.noPhoneOk == true)
          ) {
            if (this.password === this.password_confirmation)
              this.signUp();
            else
              this.noPassMatch = false;
          }
        }

      },
      signUp: function () {
        axios.post('https://memeseeds.herokuapp.com/login', {body: JSON.stringify(this.email)},)
          .then(response => this.responseData = response.data)
          .catch(error => {
          });
      }
    }
  }
</script>

<style scoped>
  .signUp-form {
    width: 600px;
    margin: auto;
    padding: 20px 0;
  }

  .signIn-prop {
    background: #12496d;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }

  .signIn-prop-inside {
    padding-top: 80px;
  }

  .signIn-prop-inside .btn :hover {
    background-color: white !important;
    color: #12496d !important;
  }

  .signIn-prop h4 {
    margin-bottom: 15px;
  }

  .signIn-btn {
    border-color: white;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 130px;
    height: 30px;
    background-color: transparent;
  }

  .router-button button:hover {
    background-color: white !important;
    color: #12496d !important;
    cursor: pointer;
  }

  .signIn-prop .faq {
    text-align: center !important;
    position: relative;
    bottom: -65px;
  }

  .signIn-prop .faq a {
    color: white;
    font-size: 12px;
  }

  .signUp-prop {
    background: #ffffff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 20px;
    padding-bottom: 30px;
    padding-left: 20px;
    text-align: center;
  }

  .signUp-prop h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #12496d;
  }

  .signUp-prop .form-group {
    padding: 10px 45px;
    margin-bottom: 0 !important;
  }

  .signUp-prop .form-control {
    margin: 15px 0;
    background-color: #f5f6f7;
    height: 30px;
    border: none !important;
  }

  .form-group input::placeholder {
    color: #000000 !important;
    font-weight: 500 !important;
  }

  .signUp-prop .signUp-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 150px;
    height: 30px;
    margin-top: -10px;
  }

  .signUp-prop button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
  }

  .hidden {
    display: none;
  }
</style>
