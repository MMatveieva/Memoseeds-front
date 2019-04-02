<template>
  <div>
    <Header></Header>
    <div class="filter-form">
      <div class="row">
        <div class="col-sm-2 info-part">
          <h2 class="filter-title">Filter</h2>
        </div>

        <div class="col-sm-10 actions-part">
          <div class="row">
            <div class="col-sm-5 subject-filter-wrapper">
              <b-form-select v-model="selected_subjects" :options="subjectsTitles"
                             v-on:input="selectSubject"></b-form-select>
            </div>
            <div class="col-sm-5 category-filter-wrapper">
              <b-form-select v-model="selected_categories" :options="categoryTitles"
                             v-bind:disabled="noSubject"></b-form-select>

            </div>
            <div class="col-sm-1 price-filter-wrapper">
              <b-form-checkbox
                id="price-checkbox"
                v-model="status"
                name="checkbox-1"
                value="free"
                unchecked-value="paid"
              >
                Free
              </b-form-checkbox>
            </div>
            <div class="col-sm-1 btn-container">
              <button type="submit" class="btn action-btn" v-on:click="filterClick">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-wrapper">
      <ShopModule
        v-for="subject in subjects"
        v-bind:key="subject.subjectId"
        v-bind:subject="subject"
        v-bind:subjectName="subject.subjectName"
        v-bind:modules="subject.modules">
      </ShopModule>
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
  import ShopModule from './ShopModule'

  export default {
    name: "AllModules",
    components: {
      Header,
      ShopModule
    },
    data() {
      return {
        config: '',

        subjects: [],
        subjectsTitles: [],
        categoryTitles: [],

        noSubject: true,
        status: true,
        selected_subjects: 'default',
        selected_categories: 'default',
        filterResponse: []
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
      this.getFilter();
      this.getAllModules();
    },
    methods: {
      getAllModules: function () {
        axios.get('https://memeseeds.herokuapp.com/shop/subjects/categories/modules', this.config)
          .then(response => {
            console.log(response.data);
            this.drawModules(response.data);
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
        if (this.selected_subjects != 'default') {
          this.categoryTitles.push({value: 'default', text: 'Category'});
          this.categoryTitles.push(this.filterResponse[this.selected_subjects]);
          this.noSubject = false;
        }
      },

      filterClick: function () {

      }
      ,

      drawModules: function (data) {
        let sb = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
          let mm = new Array(data[i].modules.length);

          for (let k = 0; k < data.length; k++) {
            let terms = "";
            for (let j = 0; (j < data[i].module.terms.length && j < 4); j++) {
              if (j == 3 || j == data[i].module.terms.length - 1)
                terms += data[i].module.terms[j].name + ".";
              else
                terms += data[i].module.terms[j].name + ", ";
            }

            let m = {
              title: data[i].module.name,
              wordsInModule: data[i].module.terms.length,
              words: terms,
              moduleId: data[i].module.moduleId
            };
            mm[i] = m;
          }

          let s = {
            subjectName: data[i].name
          };
          sb[i] = s;
        }
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
    padding: 12px 20px;
    margin-bottom: 15px;
  }

  .filter-form .row {
    width: 100%;
    margin: 0;
  }

  .filter-title {
    margin-top: 7%;
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
    width: 120px;
    height: 30px;
    border-color: white;
    margin: 0;
  }

  .actions-part button:hover {
    background-color: #186e7a !important;
    cursor: pointer;
  }

  .price-filter-wrapper, .subject-filter-wrapper, .category-filter-wrapper {
    margin: auto !important;
  }

  .category-filter-wrapper select:disabled {
    cursor: not-allowed;
  }

  .subject-filter-wrapper, .category-filter-wrapper {
    padding: 0 !important;
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

  .disabled {
    cursor: not-allowed;
  }

  .hidden {
    display: none;
  }

</style>
