<template>
  <div class="row" style="width: 100%">
    <div class="col-sm-6">
      <form v-on:keyup="inputClick" class="row" style="width: 100%">
        <input type="text" class="ans-input col-sm-3" v-model="answer">
        <div class="col-sm-9 word">{{word}}</div>
      </form>
    </div>
    <div class="col-sm-6">
      <div class="row" style="width: 100%; margin-left: 30px">
        <div class="col-sm-3">{{rowId}})</div>
        <div class="col-sm-9 def">{{definition}}</div>
      </div>
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
        this.$cookies.set('id', this.$props.rowId, 2);
      }
    }
  }
</script>

<style scoped>
  form {
    padding-left: 40px;
  }

  .word {
    text-align: left;
    padding-left: 30px;
  }

  .def{
    text-align: left;
    padding-left: 10px;
  }

  .ans-input {
    background-color: #f5f5f7;
    color: black;
    height: 30px;
    width: 30px;
    border: none !important;
    text-align: center;
  }
</style>
