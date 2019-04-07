<template>
  <div>
    <div class="logo">
      <img src="../css/images/logo.png">
    </div>
    <div class="signIn-form row">
      <div class="col-sm-5 signUp-prop">
        <div class="signUp-prop-inside">
          <h4>Nice to see you!</h4>
          <p>Enter your personal details to start using Memoseeds</p>
          <router-link to="/signUp">
            <div class="router-button">
              <button type="button" class="btn signUp-btn">SIGN UP</button>
            </div>
          </router-link>
        </div>
        <div class="faq">
          <a href="#">HOW IT WORKS?</a>
        </div>
      </div>
      <div class="col-sm-7 signIn-prop">
        <h4>SIGN IN</h4>
        <form v-on:keyup.enter="btnClick">
          <div class="form-group signIn-group">
            <input type="text" class="form-control" id="signIn-name"
                   placeholder="Name" v-model="name" required v-on:keyup="nameEdit">
            <small id="emailError" class="form-text text-muted" v-bind:class="{hidden: noName}">
              {{nameError}}
            </small>
            <input type="password" class="form-control" id="signIn-password"
                   placeholder="Password" v-model="password" required v-on:keyup="passwordEdit">
            <small id="passwordError" class="form-text text-muted" v-bind:class="{hidden: noPass}">
              {{passError}}
            </small>
            <small id="signInError" class="form-text text-muted" v-bind:class="{hidden: noLogin}"
                   style="margin-bottom: 10px">{{loginError}}
            </small>
          </div>
          <button id="signIn-btn" type="button" class="btn signIn-btn" v-on:click="btnClick">SIGN IN</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router'

  export default {
    name: "SignIn",
    data() {
      return {
        name: "",
        password: "",
        noName: true,
        noPass: true,
        noLogin: true,

        nameError: "",
        passError: "",
        loginError: ""
      }
    },
    beforeCreate: function () {
      document.body.className = 'home';
    },
    methods: {
      nameEdit: function () {
        this.noName = true;
      },
      passwordEdit: function () {
        this.noPass = true;
        this.noLogin = true;
      },
      btnClick: function () {
        this.noLogin = true;
        this.loginError = "";
        if (this.name == "") {
          this.noName = false;
          this.nameError = "Please enter username or email.";
        }
        if (this.password == "") {
          this.noPass = false;
          this.passError = "Please enter password.";
        }
        if ((this.name != "") && (this.password != "")) {
          this.signIn();
        }
      },
      signIn: function () {
        this.noName = true;
        this.noPass = true;
        this.noLogin = true;
        this.loginError = "";

        let isUserName = true;
        if (this.name.includes('@'))
          isUserName = false;

        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        };
        axios.post('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/login', {
          "Username": this.name,
          "isUsername": isUserName,
          "Password": this.password
        }, config)
          .then(response => {
            if (response.data.error != null) {
              console.log(response.data.error);
              this.loginError = response.data.error;
              this.noLogin = false;
            } else {
              this.$cookies.config(60 * 60 * 2);
              this.$cookies.set("user_session", response.data['token']);
              this.$cookies.set("userName", response.data.info.username);
              this.$cookies.set("userCredits", response.data.info.credits);
              this.$cookies.set("userMail", response.data.info.email);
              this.$cookies.set("userId", response.data.info.userId);
              this.getCountry();

              localStorage.setItem("img", this.binToImg(response.data.info.img));
              router.push('recent');
            }
          })
          .catch(error => {
            console.log(error)
          });
      },
      getCountry: function () {
        axios.get('https://ipapi.co/8.8.8.8/json/country')
          .then(response => {
            this.$cookies.set('country', response.data.country, 60 * 60 * 2);
          });
      },
      binToImg: function (data) {
        let img = document.createElement('img');
        img.src = 'data:image/jpeg;base64,' + btoa(data);
        return img;
      }
    }
  }
</script>

<style scoped>
  .signIn-form {
    width: 600px;
    margin: auto;
    padding: 20px 0;
  }

  .signUp-prop {
    background: #12496d;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 20px;
    padding-bottom: 60px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }

  .signUp-prop-inside {
    padding-top: 50px;
  }

  .signUp-prop h4 {
    margin-bottom: 15px;
  }

  .signUp-btn {
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

  .signUp-prop .faq {
    text-align: center !important;
    position: relative;
    bottom: -58px;
  }

  .signUp-prop .faq a {
    color: white;
    font-size: 12px;
  }

  .signIn-prop {
    background: #ffffff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    text-align: center;
  }

  .signIn-prop h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #12496d;
  }

  .signIn-prop .form-group {
    padding: 10px 45px;
    margin-bottom: 0 !important;
  }

  .signIn-prop .form-control {
    margin: 15px 0;
    background-color: #f5f6f7;
    height: 30px;
    border: none !important;
  }

  .form-group input::placeholder {
    color: #000000 !important;
    font-weight: 500 !important;
  }

  .signIn-prop .signIn-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 150px;
    height: 30px;
    margin-top: 10px;
  }

  .signIn-prop button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
  }

  button :disabled :hover {
    cursor: not-allowed !important;
  }

  .hidden {
    display: none;
  }

</style>
