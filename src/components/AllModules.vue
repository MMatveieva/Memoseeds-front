<template>
  <div>
    <div class="page-wrapper">
      <div class="page-con">
        <Header></Header>

        <div class="vld-parent">
          <loading :active.sync="isLoading"
                   :can-cancel="false"
                   :is-full-page="true"
                   :color="color">
          </loading>
        </div>

        <div class="filter-form">
          <div class="row">
            <div class="col-sm-3 info-part">
              <h2 class="filter-title">Filter</h2>
            </div>

            <div class="col-sm-9 actions-part">
              <div class="row">
                <div class="col-sm-4 subject-filter-wrapper">
                  <b-form-select v-model="selected_subject" :options="subjectsTitles"
                                 v-on:change="selectSubject"></b-form-select>
                </div>
                <div class="col-sm-4 category-filter-wrapper">
                  <b-form-select v-model="selected_category" :options="categoryTitles"
                                 v-bind:disabled="noSubject">
                  </b-form-select>

                </div>
                <div class="col-sm-1 price-filter-wrapper">
                  <b-form-checkbox
                    id="price-checkbox"
                    v-model="status"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="paid">
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
          <div class="no-results" v-bind:class="{hidden: isFilterRes}">Nothing found.</div>
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
      </div>
      <div class="card-footer footer">
        MEMOSEEDS INC., ALL RIGHTS RESERVED
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router'
  import ShopModule from './ShopModule'
  import SubjectModule from './SubjectModule'
  import Header from "./Header"

  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: "AllModules",
    components: {
      Header,
      ShopModule,
      SubjectModule,
      Loading
    },
    data() {
      return {
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
        isFilter: true,
        isFilterRes: true,

        isLoading: false,
        color: "#12496d"
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 1500);

      this.config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('user_session')
        }
      };
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
              if (sb[i] != 'default') {
                let s1 = {
                  value: sb[i],
                  text: sb[i]
                };
                sub.push(s1);
              }
            }
            this.subjectsTitles = sub;
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      selectSubject: function () {
        if (this.selected_subject != 'default') {
          this.noSubject = false;
          let k = {value: 'default', text: 'Category'};
          let cat = [k];
          let sub = this.filterResponse[this.selected_subject];
          for (let i = 0; i < sub.length; i++) {
            if (sub[i] != 'default') {
              let s1 = {
                value: sub[i],
                text: sub[i]
              };
              cat.push(s1);
            }
          }
          this.categoryTitles = cat;
          this.selected_category = 'default';
        } else {
          this.categoryTitles = [];
          this.noSubject = true;
        }
      },

      filterClick: function () {
        this.isShop = false;
        this.isFilter = false;
        this.isFilterRes = true;

        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false
        }, 1300);

        axios.post('https://memeseeds.herokuapp.com/shop/filter', {
          "Subject": this.selected_subject,
          "Category": this.selected_category,
          "IsFree": this.status
        }, this.config)
          .then(response => {
            if (response.data.length != 0)
              this.drawFilter(response.data);
            else
              this.isFilterRes = false;
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
          for (let j = 0; j < subject.categories.length; j++) {
            let cat = subject.categories[j];
            for (let k = 0; k < cat.modules.length; k++) {
              let mod = cat.modules[k];
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

        for (let i = 0; i < subject_keys.length; i++) {
          let subject = data[subject_keys[i]];
          if (subject.length > 0) {
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
            let subjectName = subject_keys[i];
            if (subjectName == 'default')
              subjectName = 'Other';
            let s = {
              id: i,
              subjectName: subjectName,
              modules: mm
            };
            this.subjects.push(s);
          }
        }

      },

      backClick: function () {
        this.isShop = true;
        this.isFilter = true;
        this.isFilterRes = true;
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    position: relative;
    min-height: 100vh;
  }

  .page-con {
    padding-bottom: 45px;
  }

  .info-part {
    background: #acd8c7;
    color: #ffffff;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-align: center;
    box-sizing: content-box;
  }

  .no-results {
    margin: auto;
    padding-top: 60px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 30px;
    color: #12496d;
  }

  .filter-wrapper {
    /*min-height: 345px;*/
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
    /*min-height: 345px;*/
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
    position: absolute;
    width: 100%;
    bottom: 0;
    margin-top: 30px;
  }

  .disabled {
    cursor: not-allowed;
  }

  .hidden {
    display: none;
  }

</style>
