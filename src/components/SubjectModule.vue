<template>
  <div class="module-container RecentModule">
    <div class="settings-form">
      <div class="row">
        <div class="col-sm-3 info-part">
          <h2 class="modules-title">{{title}}</h2>
          <div class="modules-info">
            <p>Number of words:</p>
            <label id="module">{{wordsInModule}}</label>
          </div>
        </div>

        <div class="col-sm-9 actions-part">
          <div class="row">
            <div class="col-sm-8 action-text">{{words}}
            </div>
            <div class="col-sm-4 btn-container">
              <button type="submit" class="btn action-btn" v-on:click="startClick">
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SubjectModule from './SubjectModule'
  import router from '../router'
  import axios from 'axios'

  export default {
    name: "SubjectModule",
    props: ['id', 'title', 'wordsInModule', 'words'],
    moduleId: '',
    price: '',
    components: {
      SubjectModule
    },

    methods: {
      startClick: function () {

        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };
        axios.post('https://memeseeds.herokuapp.com/shop/user/' + this.$cookies.get('userId') + '/get/module/' +
          this.id, {
          "userid": this.$cookies.get("userId"),
          "moduleid": ''
        }, config)
          .then(response => {
            console.log(response);
            console.log(response.data.result);
            if(response.data.result == "User has this module.") {
              this.$swal({
                title: 'You have this mod',
                text: 'Start?',
                showCancelButton: true
              }).then((value) => {
                if (value.value == true) {
                  router.push('/');
                  router.push('myModule/' + this.id);
                }
              })
            }else{
              router.push('/');
              router.push('moduleView/' + this.id);
            }
            // if(response.data.result == "Not enough credits.") {
            //   this.$swal({
            //     title: 'You don`t have enough credits',
            //     text: 'Buy?',
            //     showCancelButton: true
            //   }).then((value) => {
            //     if (value.value == true) {
            //       router.push('/');
            //       router.push('buyCredits');
            //     }
            //   })
            //
            // }
            //router.push('/');
            //router.push('moduleView/' + this.id);
          })
          .catch(error => {
            console.log(error);

          });


      }
    }
  }

  /*function user_has_module() {
    this.$swal({
      title: 'You have this module',
      text: 'Start?',
      showCancelButton: true
    }).then((value) => {
      router.push('/');
      router.push('moduleView/' + this.id);
    })
  }

  function user_buy_module() {
    this.$swal({
      title: 'You do not have this module',
      text: 'Buy?',
      showCancelButton: true
    }).then((value) => {
      router.push('/');
      router.push('moduleView/' + this.id);
    })
  }

  function user_buy_credits() {
    this.$swal({
      title: 'You do not have enough credits',
      text: 'Buy credits?',
      showCancelButton: true
    }).then((value) => {
      router.push('/');
      router.push('buyCredits');
    })
  }

  function getModuleInfo() {

  }
*/
</script>

<style scoped>
  .actions-part .action-text {
    margin: auto;
  }

  .actions-part .btn-container {
    margin: auto;
  }

  .btn:hover {
    color: white !important;
    background: #12587c !important;
    text-decoration: none;
    cursor: pointer;
  }

  .settings-form {
    padding: 12px 40px;
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
    margin-top: 6%;
    font-size: 1.6rem;
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
    padding-top: 32px;
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

  .action-btn a:hover {
    color: white;
    text-decoration: none;
  }

  .actions-part button:hover {
    background-color: #186e7a !important;
    cursor: pointer;
  }
</style>
