<template>
  <div>
    <div class="page-wrapper">
      <Header></Header>
      <div class="sr-wrapper">
        <div class="search-res-text">SEARCH RESULTS ON "{{searchInput}}"</div>

        <div class="my-models-wrapper">
          <div class="title-text">My modules</div>
          <div class="no-found" v-bind:class="{hidden: noMyMod}">Nothing found</div>
          <RecentModule
            v-for="module in myModules"
            v-bind:key="module.moduleId"
            v-bind:module="module"
            v-bind:title="module.title"
            v-bind:wordsInModule="module.wordsInModule"
            v-bind:words="module.words"
            v-bind:id="module.moduleId">
          </RecentModule>
        </div>


        <div class="all-models-wrapper">
          <div class="title-text">All modules</div>
          <div class="no-found" v-bind:class="{hidden: noAllMod}">Nothing found</div>
          <SubjectModule
            v-for="module in allModules"
            v-bind:key="module.moduleId"
            v-bind:module="module"
            v-bind:title="module.title"
            v-bind:wordsInModule="module.wordsInModule"
            v-bind:words="module.words"
            v-bind:id="module.moduleId">
          </SubjectModule>
        </div>
      </div>
      <div class="go-to-shop">
        <router-link to="/allModules">
          <button type="button" class="go-btn">GO TO ALL MODULES</button>
        </router-link>
      </div>
    </div>
    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './Header'
  import RecentModule from './RecentModule'
  import SubjectModule from './SubjectModule'

  export default {
    name: "SearchResults",
    components: {
      Header,
      RecentModule,
      SubjectModule
    },
    data() {
      return {
        myModules: [],
        allModules: [],
        searchInput: "",

        noMyMod: true,
        noAllMod: true
      }
    },

    created() {
      this.searchInput = this.$route.params.str;
      this.getSearchResults();
    },

    methods: {
      getSearchResults: function () {
        this.config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };
        axios.get('https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/search/modules/' +
          this.$route.params.str, this.config)
          .then(response => {
            let keys = Object.keys(response.data);
            let my = response.data[keys[0]];
            let all = response.data[keys[1]];
            this.drawModules(my, all);
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      drawModules: function (data1, data2) {
        let mm = new Array(data1.length);
        for (let i = 0; i < data1.length; i++) {
          let terms = "";
          for (let j = 0; (j < data1[i].terms.length && j < 4); j++) {
            if (j == 3 || j == data1[i].terms.length - 1)
              terms += data1[i].terms[j].name + ".";
            else
              terms += data1[i].terms[j].name + ", ";
          }

          let m = {
            title: data1[i].name,
            wordsInModule: data1[i].terms.length,
            words: terms,
            moduleId: data1[i].moduleId
          };
          mm[i] = m;
        }
        this.myModules = mm;
        if (this.myModules.length == 0)
          this.noMyMod = false;

        /////////////////////////////

        mm = new Array(data2.length);
        for (let i = 0; i < data2.length; i++) {
          let terms = "";
          for (let j = 0; (j < data2[i].terms.length && j < 4); j++) {
            if (j == 3 || j == data2[i].terms.length - 1)
              terms += data2[i].terms[j].name + ".";
            else
              terms += data2[i].terms[j].name + ", ";
          }

          let m = {
            title: data2[i].name,
            wordsInModule: data2[i].terms.length,
            words: terms,
            moduleId: data2[i].moduleId
          };
          mm[i] = m;
        }
        this.allModules = mm;
        if (this.allModules.length == 0)
          this.noAllMod = false;
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    position: relative;
  }

  .sr-wrapper {
    /*min-height: 368px;*/
  }

  .search-res-text {
    margin-top: 20px;
    color: #0b486d;
    font-size: 20px;
    text-align: left;
    padding-left: 40px;
  }

  .title-text {
    color: #2095a6;
    font-size: 17px;
    margin-top: 15px;
    text-align: left;
    padding-left: 40px;
  }

  .all-models-wrapper {
    margin-bottom: 20px;
  }

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

  .no-found {
    margin: auto;
    padding-top: 60px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 30px;
    color: #12496d;
  }

</style>
