<template>
  <div class="row" style="width: 100%">
    <div class="col-sm-6">
      <form v-on:keyup="inputClick">
        <input type="text" class="ans-input" v-model="answer">
        {{word}}
      </form>
    </div>
    <div class="col-sm-6">
      {{rowId}}) {{definition}}
    </div>

  </div>
</template>

<script>
  import TestTemplate from './TestTemplate'

  export default {
    name: "TestTemplate",
    props: ['rowId', 'word', 'definition'],
    components: {
      TestTemplate
    },

    data() {
      return {
        answer: ""

      }
    },

    methods: {
      inputClick: function () {
        this.$cookies.set('answer', this.answer, 2);
        this.$cookies.set('id', this.$props.rowId,2);
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
