<template>
  <div class="row" style="width: 100%">
    <div class="col-sm-6">
      <form v-on:keyup="inputClick">
        <input type="text" class="ans-input" v-model="answer">
        {{word}}
      </form>
    </div>
    <div class="col-sm-6">
      {{rowId}}. {{definition}}
    </div>

  </div>
</template>

<script>
  import TestTemplate from './TestTemplate'

  export default {
    name: "TestTemplate",
    props: ['rowId', 'answer', 'word', 'definition', 'answers'],
    components: {
      TestTemplate
    },
    methods: {
      inputClick: function () {
        this.answers.push(this.answer);
      }
    }
  }
</script>

<style scoped>
  .ans-input {
    background-color: #f5f5f7;
    color: black;
    height: 30px;
    width: 30px;
    border: none !important;
    text-align: center;
  }
</style>
