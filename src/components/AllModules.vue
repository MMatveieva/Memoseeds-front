<template>
  <div>

    <!--HEADER-->

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

    <!--HEADER-END-->

    <div class="filter-form">
      <div class="row">
        <div class="col-sm-3 info-part">
          <h2 class="filter-title">Filter</h2>
        </div>

        <div class="col-sm-9 actions-part">
          <div class="row">
            <div class="col-sm-4 subject-filter-wrapper">
              <b-form-select v-model="selected_subject" :options="subjectsTitles"
                             v-on:input="selectSubject"></b-form-select>
            </div>
            <div class="col-sm-4 category-filter-wrapper">
              <b-form-select v-model="selected_category" :options="categoryTitles"
                             v-bind:disabled="noSubject"></b-form-select>

            </div>
            <div class="col-sm-1 price-filter-wrapper">
              <b-form-checkbox
                id="price-checkbox"
                v-model="status"
                name="checkbox-1"
                value="true"
                unchecked-value="paid"
              >
                Free
              </b-form-checkbox>
            </div>
            <div class="col-sm-3 btn-container">
              <button type="submit" class="btn action-btn" v-on:click="filterClick">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-wrapper" v-bind:class="{hidden: !isShop}">
      <ShopModule
        v-for="subject in subjects"
        v-bind:key="subject.subjectId"
        v-bind:subject="subject"
        v-bind:subjectName="subject.subjectName"
        v-bind:modules="subject.modules">
      </ShopModule>
    </div>

    <div class="filter-wrapper" v-bind:class="{hidden: isFilter}">
      <SubjectModule
        v-for="module in filterModules"
        v-bind:key="module.moduleId"
        v-bind:module="module"
        v-bind:title="module.title"
        v-bind:wordsInModule="module.wordsInModule"
        v-bind:words="module.words"
        v-bind:id="module.moduleId">
      </SubjectModule>

      <div class="go-to-shop">
        <button type="button" class="go-btn" v-on:click="backClick">
          GO BACK
        </button>
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
  import ShopModule from './ShopModule'
  import SubjectModule from './SubjectModule'

  export default {
    name: "AllModules",
    components: {
      ShopModule,
      SubjectModule
    },
    data() {
      return {
        // for header
        modulesNumber: "",
        creditsNumber: "",
        userName: "",
        /****************/

        config: '',

        subjects: [],
        filterModules: [],
        subjectsTitles: [],
        categoryTitles: [],

        noSubject: true,
        status: false,
        selected_subject: 'default',
        selected_category: 'default',
        filterResponse: [],

        isShop: true,
        isFilter: true
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.$cookies.get('user_session')
        }
      };
      this.getUserInfo();
      this.getFilter();
      this.getAllModules();
    },
    methods: {
      getAllModules: function () {
        axios.get('https://memeseeds.herokuapp.com/shop/subjects/categories/modules', this.config)
          .then(response => {
            this.drawSubjects(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });

      },

      getFilter: function () {
        axios.get('https://memeseeds.herokuapp.com/shop/subjects/categories', this.config)
          .then(response => {
            this.filterResponse = response.data;
            let sb = Object.keys(this.filterResponse);
            let k = {value: 'default', text: 'Subject'};
            let sub = [k];
            for (let i = 0; i < sb.length; i++) {
              let s1 = {
                value: sb[i],
                text: sb[i]
              };
              sub.push(s1);
            }
            this.subjectsTitles = sub;
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      selectSubject: function () {
        this.categoryTitles = [];
        if (this.selected_subject != 'default') {
          this.categoryTitles.push({value: 'default', text: 'Category'});
          let sub = this.filterResponse[this.selected_subject];
          for (let i = 0; i < sub.length; i++) {
            this.categoryTitles.push(sub[i]);
          }
          this.noSubject = false;
        } else {
          this.noSubject = true;
        }
      },

      filterClick: function () {
        this.isShop = false;
        this.isFilter = false;

        axios.post('https://memeseeds.herokuapp.com/shop/filter', {
          "Subject": this.selected_subject,
          "Category": this.selected_category,
          "IsFree": this.status
        }, this.config)
          .then(response => {
            //console.log(response.data);
            this.drawFilter(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during filter. Please try again");
          });
      },

      drawFilter: function (data) {
        let filtered = new Array();

        for (let i = 0; i < data.length; i++) {
          let subject = data[i];
          //console.log(subject," ",subject.categories.length);
          for (let j = 0; j < subject.categories.length; j++) {
            let cat = subject.categories[j];
            //console.log(cat);
            for (let k = 0; k < cat.modules.length; k++) {
              let mod = cat.modules[k];
              console.log(mod);
              let terms = "";
              for (let l = 0; (l < mod.terms.length && l < 4); l++) {
                if (l == 3 || l == mod.terms.length - 1)
                  terms += mod.terms[l].name + ".";
                else
                  terms += mod.terms[l].name + ", ";
              }

              let m = {
                title: mod.name,
                wordsInModule: mod.terms.length,
                words: terms,
                moduleId: mod.moduleId
              };
              filtered.push(m);
            }
          }
        }
        this.filterModules = filtered;
      },

      drawSubjects: function (data) {
        let subject_keys = Object.keys(data);
        let sb = new Array(subject_keys.length);

        for (let i = 0; i < subject_keys.length; i++) {
          let subject = data[subject_keys[i]];
          let mm = new Array(subject.length);
          for (let k = 0; k < subject.length; k++) {
            let terms = '';
            for (let j = 0; (j < subject[k].terms.length && j < 4); j++) {
              if (j == 3 || j == subject[k].terms.length - 1)
                terms += subject[k].terms[j].name + ".";
              else
                terms += subject[k].terms[j].name + ", ";
            }
            let m = {
              title: subject[k].name,
              wordsInModule: subject[k].terms.length,
              words: terms,
              moduleId: subject[k].moduleId
            };
            mm[k] = m;
          }
          let s = {
            id: i,
            subjectName: subject_keys[i],
            modules: mm
          };
          sb[i] = s;
        }
        this.subjects = sb;
      },

      backClick: function () {
        this.isShop = true;
        this.isFilter = true;
      },

      // header functions
      getUserInfo: function () {
        this.creditsNumber = this.$cookies.get('userCredits');
        this.userName = this.$cookies.get('userName');
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
  .info-part {
    background: #acd8c7;
    color: #ffffff;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-align: center;
    box-sizing: content-box;
  }

  .filter-form {
    padding: 12px 15px;
    margin-bottom: 15px;
  }

  .filter-form .row {
    width: 100%;
    margin: 0;
  }

  .filter-title {
    margin-top: 6.5%;
    font-size: 1.7rem;
  }

  .filter-form .actions-part {
    background: #eeeeee;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding-top: 10px;
    padding-bottom: 0;
    text-align: center;
    flex: 0 0 70%;
  }

  .actions-part .btn-container {
    margin: auto;
  }

  .actions-part .action-btn {
    background-color: #2095a6 !important;
    border-radius: 20px;
    font-size: 15px;
    color: white;
    width: 90px;
    height: 30px;
    border-color: white;
    margin-left: 30px;
  }

  .actions-part button:hover {
    background-color: #186e7a !important;
    cursor: pointer;
  }

  .price-filter-wrapper, .subject-filter-wrapper, .category-filter-wrapper {
    margin: auto;
  }

  .category-filter-wrapper select:disabled {
    cursor: not-allowed;
  }

  .subject-filter-wrapper, .category-filter-wrapper {
    padding: 0;
  }

  .subject-filter-wrapper {
    padding-right: 4px;
  }

  .category-filter-wrapper {
    padding-right: 4px;
  }

  .shop-wrapper {
    margin-bottom: 20px;
  }

  /***********************************************/
  .go-to-shop {
    margin-top: 10px;
    padding: 10px 40px;
    text-align: right;
  }

  .go-to-shop a {
    color: white;
    text-decoration: none;
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
    margin-bottom: 25px;
  }

  /*******************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: relative;
    width: 100%;
    bottom: 0;
  }

  .disabled {
    cursor: not-allowed;
  }

  .hidden {
    display: none;
  }

  /*************HEADER*****************/
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

</style>
