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
    props: ['moduleId', 'title', 'wordsInModule', 'words'],
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
        axios.post('https://memeseeds.herokuapp.com/user/' + this.$cookies.get('userId') + '/has/module/' +
          this.moduleId, {
          "userid": this.$cookies.get("userId"),
          "moduleid": this.moduleId
        }, config)
          .then(response => {
            if (response.data.result == true) {
              this.$swal({
                title: 'You already have this module',
                text: 'Start?',
                showCancelButton: true
              }).then((value) => {
                if (value.value == true) {
                  router.push('../myModule/' + this.moduleId);
                }
              })
            } else {
              router.push('../moduleView/' + this.moduleId);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .actions-part .action-text {
    margin: auto;
    font-size: 17px;
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
