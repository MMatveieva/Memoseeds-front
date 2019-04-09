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
        <form v-on:keyup.enter="btnClick">
          <div class="form-group signUp-group">
            <input type="text" class="form-control" id="signUp-name"
                   placeholder="Name" v-model="name_signUp" required v-on:keyup="nameEdit">
            <small id="nameError" class="form-text text-muted" v-bind:class="{hidden: noName}">{{nameError}}</small>
            <input type="email"
                   class="form-control" id="signUp-email"
                   placeholder="Email" v-model="email" required v-on:keyup="emailEdit">
            <small id="emailError" class="form-text text-muted" v-bind:class="{hidden: noEmail}">{{mailError}}</small>
            <input type="password" class="form-control" id="signUp-password"
                   placeholder="Password" v-model="password" required v-on:keyup="passwordEdit">
            <small id="passwordError1" class="form-text text-muted" v-bind:class="{hidden: noPass}">{{passError}}
            </small>
            <input type="password" class="form-control" id="signUp-rep-password"
                   placeholder="Repeat password" v-model="password_confirmation" required
                   v-on:keyup="passwordConfirmEdit">
            <small id="passwordMissing" class="form-text text-muted" v-bind:class="{hidden: noPassRep}"
                   style="margin-bottom: 10px">{{passError1}}
            </small>
            <small id="signUpError" class="form-text text-muted" v-bind:class="{hidden: signUpSuccess}"
                   style="margin-bottom: 10px">{{signUpError}}
            </small>
          </div>
          <button id="signUp-btn" type="button" class="btn signUp-btn" v-on:click="btnClick">SIGN UP</button>
          <div>OR</div>
          <div class="facebook-btn">
            <!--<v-facebook-login app-id="363509570928956"></v-facebook-login>-->
            <facebook-login class="facebook-btn"
                            appId="363509570928956"
                            @login="onLogin"
                            @logout="onLogout"
                            @sdk-loaded="sdkLoaded">
            </facebook-login>
          </div>

          <!--<template>-->
            <!--<v-facebook-login-scope>-->
              <!--<button slot-scope="scope">-->
                <!--&lt;!&ndash; Compose HTML/CSS here, otherwise nothing will be rendered! &ndash;&gt;-->
              <!--</button>-->
            <!--</v-facebook-login-scope>-->
          <!--</template>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';
  // import VFacebookLogin from 'vue-facebook-login-component'
  import facebookLogin from 'facebook-login-vuejs';




  export default {
    name: 'SignUp',
    components: {
      // VFacebookLogin,
      facebookLogin
    },
    data() {
      return {
        name_signUp: "",
        email: "",
        password: "",
        password_confirmation: "",

        noName: true,
        noEmail: true,
        noPass: true,
        noPassRep: true,

        signUpSuccess: true,
        nameOk: true,
        nameError: "",
        mailError: "",
        passError1: "",
        passError: "",
        signUpError: ""
      }
    },
    beforeCreate: function () {
      document.body.className = 'home';
    },

    methods: {

      // FB methods

      getUserData() {

        let config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };

        this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
          console.warn("user info",userInformation);
            this.personalID = userInformation.id;
            this.email = userInformation.email;
            this.name = userInformation.name;
          },



        axios.post('https://memeseeds.herokuapp.com/fbsignup', {
          "Username": this.name,
          "Email": this.email,
          "Password": this.personalID
        }, config)
          .then(response => {
            if (response.data.error != null) {
              this.signUpError = false;
              this.signUpError = response.data.error;
            } else {
              this.$cookies.config(60 * 60 * 2);
              this.$cookies.set("user_session", response.data['token']);
              this.$cookies.set("userName", response.data.info.username);
              this.$cookies.set("userCredits", response.data.info.credits);
              this.$cookies.set("userMail", response.data.info.email);
              this.$cookies.set("userId", response.data.info.userId);
              this.getCountry();
              router.push('/allModules');
            }
          })
          .catch(error => {
            console.log(error);
            this.signUpError = "Error occurred during Sign Up. Please, try again.";
            this.signUpSuccess = false;
          })

        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      },

      nameEdit: function () {
        this.noName = true;
        this.nameOk = true;
      },
      emailEdit: function () {
        this.noEmail = true;
      },
      passwordEdit: function () {
        this.noPass = true;
      },
      passwordConfirmEdit: function () {
        this.noPassRep = true;
      },
      checkName: function () {
        if (this.name_signUp.includes('@')) {
          this.nameOk = false;
          this.nameError = "Please enter username without '@'.";
          this.noName = false;
        }
      },

      btnClick: function () {
        if (this.name_signUp == "") {
          this.noName = false;
          this.nameError = "Please enter name.";
        } else this.checkName();
        if (this.email == "") {
          this.noEmail = false;
          this.mailError = "Please enter e-mail.";
        }
        if (this.password == "") {
          this.noPass = false;
          this.passError = "Please enter password.";
        }
        if (this.password.length < 8) {
          this.noPass = false;
          this.passError = "Password should be minimum 8 signs";
        }
        if (this.password_confirmation == "") {
          this.noPassRep = false;
          this.passError1 = "Please repeat password.";
        }
        if ((this.name_signUp !== "") && (this.email !== "") && (this.password !== "") && (this.password_confirmation !== "")) {
          if ((this.password === this.password_confirmation) && (this.nameOk))
            this.signUp();
          else {
            this.noPassRep = false;
            this.passError1 = "Repeated password doesn`t match password.";
          }
        }
      },
      signUp: function () {
        this.noName = true;
        this.nameOk = true;
        this.noEmail = true;
        this.noPass = true;
        this.noPassRep = true;
        this.signUpSuccess = true;

        let config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };
        axios.post('https://memeseeds.herokuapp.com/signup', {
          "Username": this.name_signUp,
          "Email": this.email,
          "Password": this.password
        }, config)
          .then(response => {
            if (response.data.error != null) {
              this.signUpError = false;
              this.signUpError = response.data.error;
            } else {
              this.$cookies.config(60 * 60 * 2);
              this.$cookies.set("user_session", response.data['token']);
              this.$cookies.set("userName", response.data.info.username);
              this.$cookies.set("userCredits", response.data.info.credits);
              this.$cookies.set("userMail", response.data.info.email);
              this.$cookies.set("userId", response.data.info.userId);
              this.getCountry();
              router.push('/allModules');
            }
          })
          .catch(error => {
            console.log(error);
            this.signUpError = "Error occurred during Sign Up. Please, try again.";
            this.signUpSuccess = false;
          });
      },

      getCountry: function () {
        axios.get('http://ip-api.com/json/?fields=3')
          .then(response => {
            this.$cookies.set('country', response.data.country, 60 * 60 * 2);
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
    margin-bottom: 10px;
  }

  .signUp-prop button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
  }

  /**********FACEBOOK*******************/

  .facebook-btn button {
    border-radius: 40px;
    height: 37px;
  }

  .facebook-btn button:hover {
    background-color: #2b406e !important;
  }

  .facebook-btn {
    background-color: transparent !important;
    font-size: 13px;
    color: white;
    margin-left: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .hidden {
    display: none;
  }
</style>
