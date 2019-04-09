<template>
  <div>
    <Header></Header>

    <div class="recent-wrapper">
      <div class="no-modules" v-bind:class="{hidden: notEmpty}">You don`t have any modules yet.</div>

      <RecentModule
        v-for="module in this.modules"
        v-bind:key="module.moduleId"
        v-bind:module="module"
        v-bind:title="module.title"
        v-bind:wordsInModule="module.wordsInModule"
        v-bind:words="module.words"
        v-bind:id="module.moduleId">
      </RecentModule>
    </div>

    <div class="go-to-shop">
      <router-link to="/allModules">
        <button type="button" class="go-btn">
          GO TO ALL MODULES
        </button>
      </router-link>
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
  import RecentModule from './RecentModule'

  export default {
    name: "Recent",
    components: {
      Header,
      RecentModule
    },
    data() {
      return {
        userName: "",
        modules: [],
        notEmpty: true
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
      getUserInfo: function () {
        this.userName = this.$cookies.get('userName');
      },

      getUserModules: function () {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        let pass = 'https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/modules';
        axios.get(pass, config)
          .then(response => {
            if (response.data.modules.length != 0)
              this.drawModules(response.data.modules);
            else this.notEmpty = false;
          })
          .catch(error => {
            console.log(error);
            alert("Error occurred during loading modules. Please try again");
          });
      },

      drawModules: function (data) {
        data.sort(function (a, b) {
          return new Date(b.lastEdit) - new Date(a.lastEdit);
        });

        let mm = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
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
        this.modules = mm;
      }
    }
  }
</script>

<style scoped>
  .recent-wrapper {
    margin-top: 20px;
    min-height: 378px;
  }

  .no-modules {
    margin: auto;
    padding-top: 100px;
    text-align: center;
    font-size: 30px;
    color: #12496d;
  }

  /*************************************/

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
    position: relative;
    width: 100%;
    bottom: 0;
  }

  .hidden{
    display: none;
  }

</style>
