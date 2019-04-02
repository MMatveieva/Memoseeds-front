<template>
  <b-carousel-slide img-blank v-bind:id="word">
    <div class="card-title" v-bind:class="{hidden: !isDefinition}">{{definition}}</div>
    <div class="card-title" v-bind:class="{hidden: !isWord}">{{word}}</div>
    <div class="row action-service">
      <div class="col-sm-3 btn-container">
        <button type="submit" class="btn next-btn" v-on:click="translateClick">
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
        this.isDefinition = false;
        this.isWord = true;
      }
    }
  }
</script>

<style scoped>

</style>
