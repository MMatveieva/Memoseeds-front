<template>
  <div>
    <Header></Header>
    <div class="settings-form">
      <div class="row">
        <div class="col-sm-5 info-part">
          <div class="user-photo">
            <img v-bind:src="userIMG">
          </div>
          <div class="load-photo">
            <b-form-file v-model="file" class="mt-3" plain></b-form-file>
          </div>
          <div class="modules-info">
            <p>Number of modules:</p>
            <label id="modules">{{modulesNumber}}</label>
          </div>
          <div class="credits-info">
            <p>Credits available:</p>
            <label id="credits">{{creditsNumber}}</label>
          </div>
          <button type="button" class="btn settings-btn" style="margin-bottom: 13px" v-on:click="getCreditsClick">
            GET CREDITS
          </button>
          <button class="btn settings-btn" v-on:click="createModuleClick">
            CREATE MODULE
          </button>

        </div>
        <div class="col-sm-7 module-words-inside">
          <h4>EDIT ACCOUNT</h4>
          <form v-on:keyup.enter="btnClick">
            <div class="form-group edit-group">
              <input type="text" class="form-control" id="edit-name"
                     placeholder="Name" v-model="name_edit" v-on:keyup="nameEdit">
              <small id="nameError1" class="form-text text-muted" v-bind:class="{hidden: noNameOk}">{{nameError}}
              </small>
              <input type="email" class="form-control" id="edit-email"
                     placeholder="Email" v-model="email">
              <small id="mailError1" class="form-text text-muted" v-bind:class="{hidden: noMailOk}">{{mailError}}
              </small>
              <input type="password" class="form-control" id="edit-password"
                     placeholder="Old password" v-model="password" v-on:keyup="passwordEdit">
              <small id="passwordError" class="form-text text-muted" v-bind:class="{hidden: noPassOk}">{{OldPassError}}
              </small>
              <input type="password" class="form-control" id="edit-new-password"
                     placeholder="New password" v-model="password_new" v-on:keyup="passwordEdit">
              <small class="form-text text-muted" v-bind:class="{hidden: noPassMatch}">{{passError}}
              </small>
            </div>
            <button type="submit" class="btn save-btn" v-on:click="btnClick">SAVE</button>
          </form>
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
        mailError: "",

        file: "",
        userIMG: ""
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
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get('user_session')
            }
          };
          let pass = 'https://memeseeds.herokuapp.com/settings/' + this.$cookies.get('userId') + '/change/username';
          axios.post(pass, {"Old": this.$cookies.get('userName'), "New": this.name_edit}, config)
            .then(response => {
              if (response.data.error != null) {
                this.nameError = response.data.error;
                this.noNameOk = false;
              } else {
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
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get('user_session')
            }
          };
          let pass = 'https://memeseeds.herokuapp.com/settings/' + this.$cookies.get('userId') + '/change/email';
          axios.post(pass, {"Old": this.$cookies.get('userMail'), "New": this.email}, config)
            .then(response => {
              if (response.data.error != null) {
                this.mailError = response.data.error;
                this.noMailOk = false;
              } else {
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
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
        if (this.file != "")
          this.loadPhoto();
      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
        this.userIMG = 'https://memeseeds.herokuapp.com/' + this.$cookies.get('userId') + '/getImage';
      },

      getUserModules: function () {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules';
        axios.get(pass, config)
          .then(response => {
            this.modulesNumber = response.data.modules.length;
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      loadPhoto: function () {
        this.getBase64(this.file).then(
          data => this.sendImage(data)
        );
      },

      sendImage: function (data) {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/' + this.$cookies.get('userId') + '/setImage';
        let info = {
          Description: "new photo",
          ImageData: data
        };
        axios.post(pass, info, config)
          .then(response => {
            location.reload();
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading image. Please try again");
          });
      },
      getCreditsClick: function () {
        router.push('../buyCredits');
      },
      createModuleClick: function () {
        router.push('../newModule');
      },
      getBase64: function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("loadend", function () {
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
          });
          reader.onerror = error => reject(error);
        });
      }
    }
  }
</script>

<style scoped>
  .settings-form .row {
    width: 100%;
    margin: 0;
  }

  .settings-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white !important;
    width: 155px;
    height: 30px;
    margin-top: 10px;
  }

  .btn:hover {
    color: white !important;
    background: #f56e72 !important;
    text-decoration: none;
  }

  .settings-form {
    width: 600px;
    margin: auto;
    padding: 30px 0;
  }

  .info-part {
    background: #12496d;
    color: #ffffff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 0;
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    align-content: center;
    box-sizing: border-box
  }

  .load-photo {
    margin-top: -7px;
    margin-bottom: 10px;
  }

  .load-photo input {
    font-size: 13px;
    color: white;
    height: 30px;
  }

  .info-part button:hover {
    text-decoration: none;
    cursor: pointer;
    background-color: #f56e72 !important;
  }

  .user-photo {
    margin: 30px auto;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .user-photo img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }

  .info-part p {
    margin-bottom: 0;
  }

  .modules-info {
    margin-bottom: 10px;
    color: white;
  }

  .credits-info {
    margin-bottom: 10px;
  }

  .module-words-inside {
    background: #ffffff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    text-align: center;
    box-sizing: border-box
  }

  .module-words-inside h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #12496d;
  }

  .module-words-inside .form-group {
    padding: 10px 45px;
    margin-bottom: 0 !important;
  }

  .module-words-inside .form-control {
    margin: 15px 0;
    background-color: #f5f6f7;
    height: 30px;
    border: none !important;
  }

  .form-group input::placeholder {
    color: #000000 !important;
    font-weight: 500 !important;
  }

  .module-words-inside .save-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 155px;
    height: 30px;
    margin-top: -10px;
    border-color: white;
  }

  .module-words-inside button:hover {
    background-color: #f56e72 !important;
    cursor: pointer;
  }

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
  }

  .hidden {
    display: none;
  }

</style>
