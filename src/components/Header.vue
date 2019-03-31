<template>
    <div class="card-header header">
      <div class="row">
        <div class="col-sm-1 logo">
          <router-link to="/allModules">
            <img src="../css/images/logo.png">
          </router-link>
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
                <template slot="button-content">{{userName}}</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/recent">My modules</router-link>
                </b-dropdown-item>
                <b-dropdown-item class="user-dropdown" href="#">
                  <label  v-on:click="logOut">Log out</label>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  import axios from 'axios'
  import router from '../router'
  import Header from './Header'

  export default {
    name: "Settings",
    components: {
      Header
    },
    data() {
      return {
        modulesNumber: "",
        creditsNumber: "",
        userName: "",

        name_edit: "",
        email: "",
        password: "",
        password_new: "",
        noNameOk: true,
        noMailOk: true,
        noPassOk: true,
        noPassMatch: true,
        nameError: "",
        passError: "",
        OldPassError: "",
        mailError: ""
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
      nameEdit: function () {
        this.noNameOk = true;
      },
      passwordEdit: function () {
        this.noPassOk = true;
        this.noPassMatch = true;
      },
      nameChange: function () {
        if (this.$cookies.get('userName') == this.name_edit) {
          this.nameError = "New username matches old username.";
          this.noNameOk = false;
        } else {

          let config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + this.$cookies.get('user_session')
            }
          };
          let pass = 'https://memeseeds.herokuapp.com/settings/' + this.$cookies.get('userId') + '/change/username';
          axios.post(pass, {"Old": this.$cookies.get('userName'), "New": this.name_edit}, config)
            .then(response => {
              if (response.data.error != null) {
                this.nameError = response.data.error;
                this.noNameOk = false;
              } else {
                console.log(response.data);
                this.$cookies.set('userName', this.name_edit);
              }
            })
            .catch(error => {
              this.noPassMatch = false;
              this.passError = "An error occured.";
              console.log(error)
            });
        }

      },
      emailChange: function () {
        if (this.$cookies.get('userName') == this.name_edit) {
          this.mailError = "New email matches old email.";
          this.noMailOk = false;
        } else {
          let config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + this.$cookies.get('user_session')
            }
          };
          let pass = 'https://memeseeds.herokuapp.com/settings/' + this.$cookies.get('userId') + '/change/email';
          axios.post(pass, {"Old": this.$cookies.get('userMail'), "New": this.email}, config)
            .then(response => {
              if (response.data.error != null) {
                this.mailError = response.data.error;
                this.noMailOk = false;
              } else {
                console.log(response.data);
                this.$cookies.set('userMail', this.email);
              }
            })
            .catch(error => {
              this.noPassMatch = false;
              this.passError = "An error occured.";
              console.log(error)
            });
        }
      },
      passwordChange: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/settings/' + this.$cookies.get('userId') + '/change/password';
        axios.post(pass, {"Old": this.password, "New": this.password_new}, config)
          .then(response => {
            if (response.data.error != null) {
              this.noPassMatch = false;
              this.passError = response.data.error;
            } else {
              console.log(response.data);
            }
          })
          .catch(error => {
            this.noPassMatch = false;
            this.passError = "An error occured.";
            console.log(error)
          });
      },

      btnClick: function () {
        if (this.name_edit != "")
          this.nameChange();

        if (this.email != "")
          this.emailChange();

        if ((this.password != "") && (this.password_new != ""))
          this.passwordChange();
        else if (((this.password == "") && (this.password_new != "")) ||
          ((this.password != "") && (this.password_new == ""))) {
          this.noPassMatch = false;
          this.passError = "Please fill both fields.";
        }
      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      getUserModules: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules';
        axios.get(pass, config)
          .then(response => {
            console.log(response.data);
            this.modulesNumber = response.data.length;
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },
      logOut: function () {
        this.$cookies.remove("user_session");
        this.$cookies.remove("userName");
        this.$cookies.remove("userCredits");
        this.$cookies.remove("userMail");
        this.$cookies.remove("userId");
        this.$cookies.remove('country');
        router.push('signIn');
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: #12496d;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 20px;
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

  .header-user img {
    margin: 8px auto;
    width: 55px;
    height: 55px;
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

  .user-name a {
    color: #0b486d !important;
    text-decoration: none;
  }

  .user-name a:hover {
    color: #0b486d !important;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: white;
  }

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
