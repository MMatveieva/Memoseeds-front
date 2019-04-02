<template>
  <b-carousel-slide img-blank v-bind:id="id">
    <div class="card-title" v-bind:class="{hidden: !isDefinition}">{{definition}}</div>
    <div class="card-title" v-bind:class="{hidden: !isWord}">{{word}}</div>
    <div class="action-service">
      <div class="btn-container">
        <button type="button" class="btn next-btn" v-on:click="translateClick">
          SEE TRANSLATION
        </button>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script>
  import LearnTemplate from './LearnTemplate'

  export default {
    name: "LearnTemplate",
    props: ['id', 'word', 'definition'],
    components: {
      LearnTemplate
    },
    data() {
      return {
        isDefinition: true,
        isWord: false
      }
    },

    methods: {
      translateClick: function () {
        if(this.isDefinition) {
          this.isDefinition = false;
          this.isWord = true;
        } else{
          this.isDefinition = true;
          this.isWord = false;
        }
      }
    }
  }
</script>

<style scoped>
  .card-title {
    color: #0b486d;
    font-size: 1.7rem;
    font-weight: 500;
  }

  .action-service {
    margin-top: 40px;
    text-align: center;
  }

  .next-btn {
    background-color: #f59699 !important;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    width: 180px;
    height: 25px;
    border-color: white;
    margin: 0;
    padding-top: 3px;
  }

  button:hover {
    color: white !important;
    background: #f56e72 !important;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }

</style>
