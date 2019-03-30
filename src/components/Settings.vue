<template>
  <div>
    <div class="card-header header ">
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
              <div class="user-photo-header">
              </div>
            </div>
            <div class="user-acc col-sm-6">
              <b-dropdown class="user-name" offset="-16">
                <template slot="button-content" style="background: transparent">{{userName}} user-acc</template>
                <b-dropdown-item class="user-dropdown" href="#">
                  <router-link to="/settings">Settings</router-link>
                </b-dropdown-item>

                <router-link to="/myModules">
                  <b-dropdown-item class="user-dropdown" href="#">My modules</b-dropdown-item>
                </router-link>
                <router-link to="/signIn">
                  <b-dropdown-item class="user-dropdown" href="#">Log out</b-dropdown-item>
                </router-link>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-form row">
      <div class="col-sm-5 info-part">
        <div class="user-photo">
        </div>
        <div class="modules-info">
          <p>Number of modules:</p>
          <label id="modules">{{modulesNumber}}</label>
        </div>
        <div class="credits-info">
          <p>Credits available:</p>
          <label id="credits">{{creditsNumber}}</label>
        </div>
        <a href="#" class="btn settings-btn" style="margin-bottom: 13px">GET CREDITS</a>
        <a href="#" class="btn settings-btn">CREATE MODULES</a>

      </div>
      <div class="col-sm-7 module-words-inside">
        <h4>EDIT ACCOUNT</h4>
        <form>
          <div class="form-group edit-group">
            <input type="text" class="form-control" id="edit-name"
                   placeholder="Name" v-model="name_edit" v-on:keyup="nameEdit"
                   v-bind:class="{not_ok: noNameOk}">
            <small id="nameError1" class="form-text text-muted" v-bind:class="{hidden: noNameOk}">Please
              enter name without numbers.
            </small>
            <input type="email" class="form-control" id="edit-email"
                   placeholder="Email" v-model="email">
            <input type="text" class="form-control" id="edit-phone"
                   placeholder="Phone number" v-model="phone" v-on:keyup="phoneEdit"
                   v-bind:class="{not_ok: noPhoneOk}">
            <small id="phoneError1" class="form-text text-muted" v-bind:class="{hidden: noPhoneOk}">Please enter
              phone number correctly.
            </small>
            <input type="password" class="form-control" id="edit-password"
                   placeholder="Old password" v-model="password" v-on:keyup="passwordEdit">
            <small id="passwordError" class="form-text text-muted" v-bind:class="{hidden: noPassOk}">Incorrect
              password.
            </small>
            <input type="password" class="form-control" id="edit-new-password"
                   placeholder="New password" v-model="password_new" v-on:keyup="passwordEdit">
            <small class="form-text text-muted" v-bind:class="{hidden: noPassMatch}">New password can`t match
              new password.
            </small>
          </div>
          <button type="submit" class="btn save-btn" v-on:click="btnClick">SAVE</button>
        </form>
      </div>

    </div>

    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  export default {
    name: "Settings",

    data() {
      return {
        modulesNumber: "",
        creditsNumber: "",
        userName: "",

        name_edit: "",
        email: "",
        // phone: "",
        password: "",
        password_new: "",
        noNameOk: true,
        // noPhoneOk: true,
        noPassOk: true,
        noPassMatch: true,
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
      // phoneEdit: function () {
      //   this.noPhoneOk = true;
      // },
      passwordEdit: function () {
        this.noPassOk = true;
        this.noPassMatch = true;
      },
      nameChange: function () {
      },
      emailChange: function () {
      },
      // phoneChange: function () {
      // },
      passwordChange: function () {
      },
      checkName: function (data) {
        let nameReg = /^[a-zA-Z-а-яА-Яії'є\s]*$/;
        if (!nameReg.test(data))
          this.noNameOk = true;
      },
      // checkPhone: function (data) {
      //   let phoneReg = /^[0-9+]/;
      //   if (!phoneReg.test(data))
      //     this.noPhoneOk = true;
      // },
      btnClick: function () {
        if (this.name_edit != "") {
          this.checkName(this.name_edit);
          if (this.noNameOk == false)
            this.nameChange();
        }
        if (this.email != "")
          this.emailChange();
        // if (this.phone != "") {
        //   this.checkPhone(this.phone);
        //   if (this.noPhoneOk == false)
        //     this.phoneChange();
        // }
        if ((this.password != "") && (this.password_new != ""))
          this.passwordChange();
      },

      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
      },

      getUserModules: function () {
        
      }
    }
  }
</script>

<style scoped>
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

  .user-name .btn {
    background-color: transparent !important;
    border: none;
    color: #ffffff;
  }

  .dropdown-toggle {
    background-color: transparent !important;
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

  .settings-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 13px;
    color: white;
    width: 150px;
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
  }

  .user-photo {
    margin: 30px auto;
    width: 110px;
    height: 110px;
    background-color: white;
    border-radius: 50%;
  }

  .info-part p {
    margin-bottom: 0;
  }

  .modules-info {
    margin-bottom: 10px;
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
    width: 150px;
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
