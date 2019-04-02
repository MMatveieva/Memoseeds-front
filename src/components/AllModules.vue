<template>
  <div>
    <Header></Header>
    <div class="filter-form">
      <div class="row">
        <div class="col-sm-3 info-part">
          <h2 class="filter-title">Filter</h2>
        </div>

        <div class="col-sm-9 actions-part">
          <div class="row">
            <div class="col-sm-2 subject-filter-wrapper">
              <b-form-select v-model="selected_subjects" :options="subjectsTitles"
                             v-on:select="noSubject=true"></b-form-select>
            </div>
            <div class="col-sm-2 category-filter-wrapper">
              <b-form-select v-model="selected_categories" :options="categoryTitles"
                             v-bind:disabled="noSubject"></b-form-select>

            </div>
            <div class="col-sm-2 price-filter-wrapper">
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
            <div class="col-sm-3 btn-container">
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
        subjects: [],
        subjectsTitles: [],
        categoryTitles: [],

        noSubject: true,
        status: true,
        selected_subjects: "",
        selected_categories: ""
      }
    },

    beforeCreate: function () {
      document.body.className = 'inside';
    },

    created: function () {
      this.getAllModules();
    },
    methods: {
      getAllModules: function () {
        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };

        axios.get('https://memeseeds.herokuapp.com/shop/subjects/categories/modules', config)
          .then(response => {
            console.log(response.data);
            this.drawSubjects(response.data);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });

      },

      getFilter: function () {
      },

      filterClick: function () {

      },

      drawSubjects: function (data) {
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
    padding: 12px 40px;
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

  .price-filter-wrapper {
    margin: auto;
  }

  .category-filter-wrapper select:disabled {
    cursor: not-allowed;
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
